import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const sessionm = await mongoose.startSession()

    try {
      sessionm.startTransaction()

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(403).send('Permission denied. Only Admin can update ticket')

      const { id, total_amount } = req.body
      if (!id || total_amount === undefined || typeof total_amount !== 'number')
        return res.status(400).send('Fields Missing')

      // Retrieve the payment session before updating
      const currentSession = await PaymentSessionModel.findById(id)
      if (!currentSession) return res.status(400).send('Payment session not found')

      const previousTotalPayment = currentSession.total_payment

      const paymentHistories = await PaymentHistoryModel.find({
        payment_session_id: new mongoose.Types.ObjectId(id)
      })

      if (paymentHistories && paymentHistories.length > 1) {
        return res.status(400).send('Cannot update total payment')
      }

      const remaining_payment = total_amount - paymentHistories[0].received_payment

      const updatedSession = await PaymentSessionModel.findByIdAndUpdate(
        id,
        {
          $set: {
            remaining_payment: remaining_payment,
            total_payment: total_amount
          }
        },
        { session: sessionm, new: true }
      )
      if (!updatedSession) return res.status(400).send('Not able to update payment. Please try again')

      const updatedPaymentHistory = await PaymentHistoryModel.findByIdAndUpdate(
        paymentHistories[0]._id,
        {
          $set: {
            remaining_payment: remaining_payment
          }
        },
        { session: sessionm, new: true }
      ).populate('closer_id', 'user_name')

      if (!updatedPaymentHistory) return res.status(400).send('Not able to update payment. Please try again')

      await sessionm.commitTransaction()

      // Fetching additional details for logging
      const business = await BusinessModel.findById(currentSession.business_id)
      const ticket = await BusinessTicketModel.findById(currentSession.ticket_id)

      const businessName = business?.business_name || 'Unknown business'
      const workStatus = ticket?.work_status || 'Unknown work status'
      const userName = req.user?.user_name || 'Unknown user'
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      // Create a log entry
      createLog({
        msg: `${userName} updated a total payment of business name: ${businessName} for work status: ${workStatus} from IP: ${clientIP}. Total amount before was ${previousTotalPayment}, Total amount now is ${total_amount}.`
      })

      return res.send({
        message: 'Total payment updated',
        payload: { paymentHistory: updatedPaymentHistory, session: updatedSession }
      })
    } catch (error) {
      console.log(error)
      await sessionm.abortTransaction()

      res.status(500).send('Something went wrong')
    } finally {
      if (sessionm) sessionm.endSession()
    }
  } else {
    res.status(500).send('This is a PATCH request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
