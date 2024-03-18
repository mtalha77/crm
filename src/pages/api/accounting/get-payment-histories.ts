import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { ticketId } = req.body
      if (!ticketId) return res.status(500).send('Network Error')

      const paymentHistories = await PaymentHistoryModel.find({ ticket_id: ticketId }).populate(
        'closer_id',
        'user_name'
      )

      return res.send({
        message: 'payment history fetched successfully',
        payload: { paymentHistories }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
