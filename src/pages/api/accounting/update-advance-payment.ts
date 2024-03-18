import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const sessionm = await mongoose.startSession()

    try {
      sessionm.startTransaction()

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER))
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')

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
