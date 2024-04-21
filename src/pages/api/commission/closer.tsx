import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const paymentHistory = await PaymentHistoryModel.find({ closer_id: { $exists: true } })
        .populate('business_id', 'business_name')
        .populate('closer_id', 'user_name')
        .populate('ticket_id', 'work_status')
        .sort({ createdAt: -1 })

      return res.send({
        message: 'payment history fetched successfully',
        payload: { paymentHistory }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
