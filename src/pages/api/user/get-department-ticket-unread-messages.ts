import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema';
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const user = req.user
      const { ticketId } = req.body
      let DepartmentTicket

      if (user.role === UserRole.ADMIN || user.role === UserRole.SALE_MANAGER || user.role === UserRole.TEAM_LEAD || user.role === UserRole.EMPLOYEE) {
        DepartmentTicket = await DepartTicketModel.findById(ticketId)
          .populate({ path: 'business_id', select: 'business_name' })
          .populate('messages.sender')
          .exec()
      } else if (user.role === UserRole.TEAM_LEAD) {
        DepartmentTicket = await DepartTicketModel.find({
          assignee_depart_name: user.department_name,
          _id: ticketId
        })
          .populate({ path: 'business_id', select: 'business_name' })
          .populate('messages.sender')
          .exec()
      } else {
        return res.status(200).send({
          message: 'No message available',
          payload: {}
        })
      }

      const unreadMessages = DepartmentTicket?.messages
        .filter(
          (message: any) =>
            !message.readBy.some(read => read.userId.toString() === user._id) && // Convert to string for comparison
            message.sender._id.toString() !== user._id // Convert to string for comparison
        ) // Filter out messages already read by the user
        .map((message: any) => {
          const plainMessage = message.toObject()
          plainMessage.DepartmentTicketsId = DepartmentTicket._id
          plainMessage.business_name = DepartmentTicket.business_id.business_name

          // Assign only the user name of the team lead
          plainMessage.assignee_team_lead = DepartmentTicket.assignee_depart_name || null

          plainMessage.work_status = DepartmentTicket.work_status

          return plainMessage
        })
      unreadMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      return res.status(200).send({
        message: 'Messages fetched successfully',
        payload: { unreadMessages: unreadMessages }
      })
    } catch (error: any) {
      console.error('Error fetching messages:', error)

      return res.status(500).send({ message: 'Something went wrong', error: error.message })
    }
  } else {
    return res.status(405).send({ message: 'Method not allowed' })
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
