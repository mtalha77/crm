import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const sessionm = await mongoose.startSession()

    try {
      sessionm.startTransaction()

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER)) {
        return res.status(403).send('Permission denied. Only Admin and Sales can update ticket')
      }

      const { sessionId, paymentHistoryId } = req.body
      if (!sessionId) return res.status(400).send('Fields Missing')

      const paymentHistories = await PaymentHistoryModel.find({
        payment_session_id: new mongoose.Types.ObjectId(sessionId)
      }).sort({ createdAt: -1 })

      if (
        paymentHistories &&
        (paymentHistories[0]._id.toString() !== paymentHistoryId || paymentHistories.length === 1)
      ) {
        return res.status(400).send('Cannot delete payment')
      }

      const deletedPaymentHistory = await PaymentHistoryModel.findByIdAndDelete(paymentHistories[0]._id, {
        session: sessionm,
        new: true
      })

      if (!deletedPaymentHistory) return res.status(400).send('Not able to update payment. Please try again')

      const session = await PaymentSessionModel.findByIdAndUpdate(
        sessionId,
        {
          $inc: {
            remaining_payment: deletedPaymentHistory.received_payment
          }
        },
        { session: sessionm, new: true }
      )
      if (!session) return res.status(400).send('Not able to update payment. Please try again')

      await sessionm.commitTransaction()

      // Fetching additional details for logging
      const business = await mongoose.model('Business').findById(session.business_id)
      const businessName = business?.business_name || 'Unknown business'
      const ticket = await mongoose.model('BusinessTicket').findById(session.ticket_id)
      const workStatus = ticket?.work_status || 'Unknown work status'
      const userName = req.user?.user_name || 'Unknown user'
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      const closer = await mongoose.model('User').findById(session.closer_id)
      const closerName = closer?.user_name || 'Unknown closer'
      const fronter = session.fronter_id ? await mongoose.model('User').findById(session.fronter_id) : null
      const fronterName = fronter?.user_name || 'Unknown fronter'

      // Create a log entry
      createLog({
        msg: `${userName} deleted payment session of business name: ${businessName} for work status: ${workStatus} from IP: ${clientIP}. Closer name was ${closerName}, and fronter name was ${fronterName}.`
      })

      return res.send({
        message: 'Payment session deleted and total payment updated',
        payload: {}
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
