import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema';
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import createLog from 'src/backend/utils/createLog';

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {

      const user = req.user
      const clientIP = req.clientIP

      const { ticketId } = req.body
      if (!ticketId) return res.status(500).send('Network Error')

      const paymentSessions = await PaymentSessionModel.find({ ticket_id: ticketId })
        .populate('closer_id', 'user_name')
        .populate('fronter_id', 'user_name')
        .sort({ createdAt: -1 })

      //additional log info
      const ticket = await BusinessTicketModel.findById(ticketId).populate('business_id')

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} fetched payment sessions information of business: ${ticket?.business_id?.business_name} with work_status: ${ticket?.work_status}`
      createLog({ msg: logMsg })

      return res.send({
        message: 'payment sessions fetched successfully',
        payload: { paymentSessions }
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
