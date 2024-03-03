import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.TEAM_LEAD))
        return res.status(403).send('Permission denied.')
      const { ticketId, status } = req.body
      if (!ticketId || !status) return res.status(400).send('Fields Missing')

      const result = await DepartTicketModel.findByIdAndUpdate(ticketId, {
        $set: {
          status: status
        }
      })

      if (!result) return res.status(500).send('Not able to update ticket.Please try again')

      return res.send({
        message: `Ticket Status Changes to ${status}`,
        payload: {}
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
