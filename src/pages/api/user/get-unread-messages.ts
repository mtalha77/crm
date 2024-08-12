import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import UserModel from 'src/backend/schemas/user.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const user = req.user
      let businessTickets

      if (user.role === UserRole.ADMIN || user.role === UserRole.SALE_MANAGER) {
        businessTickets = await BusinessTicketModel.find()
          .populate({ path: 'business_id', select: 'business_name' })
          .populate('messages.sender')
          .exec()
      } else if (user.role === UserRole.TEAM_LEAD) {
        businessTickets = await BusinessTicketModel.find({
          assignee_depart_name: user.department_name
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

      // Fetch the team leads for the relevant departments and select only the user_name field
      const teamLeads = await UserModel.find({
        department_name: { $in: businessTickets.map(ticket => ticket.assignee_depart_name) },
        role: UserRole.TEAM_LEAD
      })
        .select('user_name department_name') // Select only the user_name and department_name fields
        .exec()

      // Map the department_name to the user_name of the team lead
      const teamLeadMap = new Map(teamLeads.map(lead => [lead.department_name, lead.user_name]))

      // Extract the unread messages send by other users
      const messagesPromises = businessTickets.flatMap(ticket =>
        ticket.messages
          .filter(
            message => !message.readBy.some(read => read.userId.equals(user._id)) && user._id !== message.sender._id
          ) // Filter out messages already read by the user
          .map(message => {
            const plainMessage = message.toObject()
            plainMessage.businessTicketsId = ticket._id
            plainMessage.business_name = ticket.business_id.business_name

            // Assign only the user name of the team lead
            plainMessage.assignee_team_lead = teamLeadMap.get(ticket.assignee_depart_name) || null

            plainMessage.work_status = ticket.work_status

            return plainMessage
          })
      )

      // Resolve all promises
      const messages = await Promise.all(messagesPromises)

      // Sort messages by createdAt in descending order
      messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      return res.status(200).send({
        message: 'Messages fetched successfully',
        payload: { unreadMessages: messages }
      })
    } catch (error) {
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
