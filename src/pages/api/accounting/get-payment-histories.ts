import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { ticketId } = req.body
      if (!ticketId) return res.status(500).send('Network Error')

      // Fetch the payment history
      const paymentHistories = await PaymentHistoryModel.find({ ticket_id: ticketId }).populate(
        'closer_id',
        'user_name'
      )

      // Fetch the ticket to get business name and work status
      const ticket = await BusinessTicketModel.findById(ticketId)
        .populate({
          path: 'business_id',
          select: 'business_name'
        })
        .select('work_status')

      if (!ticket) {
        return res.status(404).send('Ticket not found')
      }

      const businessName = ticket.business_id?.business_name || 'Unknown business'
      const workStatus = ticket.work_status || 'Unknown work status'
      const userName = req.user?.user_name || 'Unknown user'
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      // Create a log entry
      createLog({
        msg: `${userName} fetched payment history of business name: ${businessName} for work status: ${workStatus} from IP: ${clientIP}`
      })

      return res.send({
        message: 'Payment history fetched successfully',
        payload: { paymentHistories }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(500).send('This is a POST request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
