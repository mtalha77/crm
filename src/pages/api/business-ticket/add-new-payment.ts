import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    try {
      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_EMPLOYEE))
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')
      const { ticketId, payment } = req.body
      if (!ticketId || !payment) return res.status(400).send('Fields Missing')

      const result = await BusinessTicketModel.findByIdAndUpdate(ticketId, {
        $push: { payment_history: payment }
      })

      if (!result) return res.status(500).send('Not able to update ticket.Please try again')

      return res.send({
        message: `Payment history updated`,
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
