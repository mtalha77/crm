import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    try {
      if (
        !(
          req.user.role === UserRole.ADMIN ||
          req.user.role === UserRole.SALE_EMPLOYEE ||
          req.user.role === UserRole.SALE_MANAGER
        )
      )
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')

      const { ticketId, payment, payment_id, refund_amount } = req.body
      if (!ticketId || !payment || !payment_id) return res.status(400).send('Fields Missing')
      let temp = {}
      if (refund_amount) {
        temp = {
          'payment_history.$.refunds': { refund_amount, refund_date: Date.now() }
        }
        payment.advance_payment = payment.advance_payment - refund_amount
        payment.remaining_payment = payment.total_payment - payment.advance_payment
      }

      const result = await BusinessTicketModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(ticketId),
          payment_history: {
            $elemMatch: { _id: new mongoose.Types.ObjectId(payment_id) }
          }
        },
        {
          $set: {
            'payment_history.$.total_payment': payment.total_payment,
            'payment_history.$.remaining_payment': payment.remaining_payment,
            'payment_history.$.advance_payment': payment.advance_payment
          },
          $push: temp
        }
      )

      if (result.modifiedCount === 0) return res.status(500).send('Not able to update ticket.Please try again')

      return res.send({
        message: `Payment updated successfully`,
        payload: {}
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a patch request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
