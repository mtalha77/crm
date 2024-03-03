import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { ticketId } = req.body
      const ticket = await DepartTicketModel.findById(ticketId)
        .populate('business_id')
        .populate('created_by', 'user_name')
        .populate('assignee_employee_id', 'user_name')

      if (!ticket) {
        return res.status(404).send('ticket not found')
      }

      return res.send({
        message: 'ticket fetched successfully',
        payload: { ticket }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
