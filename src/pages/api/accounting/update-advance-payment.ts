import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema';
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import createLog from 'src/backend/utils/createLog';
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const sessionm = await mongoose.startSession()

    try {

      const user = req.user
      const clientIP = req.clientIP

      sessionm.startTransaction()

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(403).send('Permission denied.Only Admin can update ticket')

      const { id, advance_amount } = req.body
      if (!id || !advance_amount) return res.status(400).send('Fields Missing')

      const paymentHistories = await PaymentHistoryModel.find({ payment_session_id: new mongoose.Types.ObjectId(id) })

      if (paymentHistories && paymentHistories.length > 1) {
        return res.status(400).send('Cannot update advance payment')
      }

      const paymentSession = await PaymentSessionModel.findById(id)

      if (!paymentSession) return res.status(400).send('Network Error')

      const remaining_payment = paymentSession.total_payment - advance_amount

      const session = await PaymentSessionModel.findByIdAndUpdate(
        id,
        {
          $set: {
            remaining_payment: remaining_payment,
            advance_payment: advance_amount
          }
        },
        { session: sessionm, new: true }
      )
      if (!session) return res.status(400).send('Not able to update payment.Please try again')

      const result3 = await PaymentHistoryModel.findByIdAndUpdate(
        paymentHistories[0]._id,
        {
          $set: {
            remaining_payment: remaining_payment,
            received_payment: advance_amount
          }
        },
        { session: sessionm, new: true }
      ).populate('closer_id', 'user_name')

      if (!result3) return res.status(400).send('Not able to update payment.Please try again')

      await sessionm.commitTransaction()

      // log info
      const ticket = await BusinessTicketModel.findById(result3.ticket_id).populate('business_id')

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} updated advance payment information of business: ${ticket?.business_id?.business_name} with work_status: ${ticket?.work_status}`
      createLog({ msg: logMsg })


      return res.send({
        message: `advance Payment updated`,
        payload: { paymentHistory: result3, session: session }
      })
    } catch (error) {
      console.log(error)
      await sessionm.abortTransaction()

      res.status(500).send('something went wrong')
    } finally {
      if (sessionm) sessionm.endSession()
    }
  } else {
    res.status(500).send('this is a patch request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
