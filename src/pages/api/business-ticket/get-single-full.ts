import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { ticketId } = req.body // Ensure ticketId is accessible
      const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      const userName = req.user?.user_name || 'Unknown user' // Ensure userName is accessible

      // Find the ticket and populate business name and work status
      const ticket = await BusinessTicketModel.findById(ticketId)
        .populate({
          path: 'business_id',
          select: 'business_name work_status'
        })
        .populate('created_by', 'user_name')
        .populate('assignee_employees', 'user_name')
        .populate({
          path: 'child_tickets.child_id',
          model: 'DepartTicket'
        })

      if (!ticket) {
        createLog({ msg: `Ticket with ID: ${ticketId} not found. Attempted by: ${userName} from IP: ${clientIP}` })

        return res.status(404).send('Ticket not found')
      }

      const businessName = ticket.business_id.business_name || 'Unknown business'
      const workStatus = ticket.business_id.work_status || 'Unknown work status'

      // Log the successful fetch with the business name
      createLog({
        msg: `${userName} is attempting to fetch ticket with business name: ${businessName}`
      })

      // Log the detailed message with work status
      createLog({
        msg: `Ticket with Work Status: ${workStatus} for business '${businessName}' fetched successfully by ${userName} from IP: ${clientIP}`
      })

      return res.send({
        message: 'Ticket fetched successfully',
        payload: { ticket }
      })
    } catch (error) {
      console.error(error)

      // Handle errors, ensuring that businessName is defined for logging
      const businessName =
        ticket && ticket.business_id && ticket.business_id.business_name
          ? ticket.business_id.business_name
          : 'Unknown business'

      createLog({
        msg: `Error fetching ticket with ID: ${ticketId} for business '${businessName}'. Attempted by ${userName} from IP: ${clientIP}`
      })
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(405).send('This is a POST request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
