import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import createLog from 'src/backend/utils/createLog';

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {

      const user = req.user
      const clientIP = req.clientIP

      const paymentHistory = await PaymentHistoryModel.find({ fronter_id: { $exists: true } })
        .populate('business_id', 'business_name')
        .populate('fronter_id', 'user_name')
        .populate('ticket_id', 'work_status')
        .sort({ createdAt: -1 })


      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} is attempting to fetch fronter payment history`
      createLog({ msg: logMsg })

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
