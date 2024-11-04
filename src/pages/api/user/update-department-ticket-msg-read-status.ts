import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { departmentTicketId } = req.body // Assuming departmentTicketId and messageId are sent in the request body
      const user = req.user

      // Validate inputs
      if (!departmentTicketId) {
        return res.status(400).send({ message: 'departmentTicketId and messageId are required' })
      }

      // Update the readBy field in all messages of the business ticket for the user
      await DepartTicketModel.updateMany(
        { _id: departmentTicketId },
        {
          $addToSet: {
            'messages.$[elem].readBy': {
              userId: user._id,
              role: user.role,
              readAt: new Date()
            }
          }
        },
        {
          arrayFilters: [{ 'elem.readBy.userId': { $ne: user._id } }] // Update messages that are not already read by the user
        }
      )

      // Retrieve the updated business ticket to get the updated messages
      const updatedTicket = await DepartTicketModel.findOne({ _id: departmentTicketId }).exec()

      if (!updatedTicket) {
        return res.status(404).send({ message: 'Updated Business Ticket not found' })
      }

      return res.status(200).send({
        message: 'Messages marked as read successfully',
        payload: {}
      })
    } catch (error) {
      console.error('Error updating message status:', error)

      return res.status(500).send({ message: 'Something went wrong' })
    }
  } else {
    return res.status(405).send({ message: 'Method not allowed' })
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
