import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const sessionm = await mongoose.startSession()

    try {
      sessionm.startTransaction()

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER))
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')

      const { received_payment, session_remaining_payment, id, closer_id } = req.body
      if (!received_payment || !session_remaining_payment || !id || !closer_id)
        return res.status(400).send('Fields Missing')

      const remaining_payment = session_remaining_payment - received_payment

      const session = await PaymentSessionModel.findByIdAndUpdate(
        id,
        {
          $set: {
            remaining_payment: remaining_payment
          }
        },
        { session: sessionm, new: true }
      )

      const paymentHistory = new PaymentHistoryModel({
        received_payment: received_payment,
        payment_type: PaymentType.Credit,
        remaining_payment: remaining_payment,
        ticket_id: session.ticket_id,
        payment_session_id: session._id,
        business_id: session.business_id,
        session: session.session,
        sales_type: session.sales_type,
        fronter_id: session.fronter_id ? session.fronter_id : undefined,
        closer_id: closer_id
      })
      const result3 = await paymentHistory.save({ session: sessionm })

      if (!result3) throw new Error('Not able to create ticket.Please try again')
      const populatedResult3 = await result3.populate('closer_id')
      if (!populatedResult3) throw new Error('Not able to create ticket.Please try again')
      await sessionm.commitTransaction()

      return res.send({
        message: `Payment Credited`,
        payload: { paymentHistory: populatedResult3, session }
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
