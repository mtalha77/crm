import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.TEAM_LEAD))
        return res.status(403).send({ message: 'Permission denied.Only Admin and TeamLead can update ticket' })
      const { ticketId, employee_id, user_name } = req.body
      if (!ticketId) return res.status(400).send('Fields Missing')

      const result = await BusinessTicketModel.findByIdAndUpdate(ticketId, {
        $set: {
          assignee_employee_id: new mongoose.Types.ObjectId(employee_id)
        }
      })

      if (!result) return res.status(500).send('Not able to update ticket.Please try again')

      return res.send({
        message: `Ticket assigned to ${user_name}`,
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
