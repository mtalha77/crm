import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import UserModel from 'src/backend/schemas/user.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { businessTicketsId, messageId } = req.body // Assuming businessTicketsId and messageId are sent in the request body
      const user = req.user

      // Validate inputs
      if (!businessTicketsId || !messageId) {
        return res.status(400).send({ message: 'businessTicketsId and messageId are required' })
      }

      // Update the readBy field in all messages of the business ticket for the user
      await BusinessTicketModel.updateMany(
        { _id: businessTicketsId },
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
      const updatedTicket = await BusinessTicketModel.findOne({ _id: businessTicketsId }).exec()

      if (!updatedTicket) {
        return res.status(404).send({ message: 'Updated Business Ticket not found' })
      }

      // Find the specific message that was clicked
      const updatedMessage = updatedTicket.messages.find((msg: any) => msg._id.toString() === messageId)

      return res.status(200).send({
        message: 'Messages marked as read successfully',
        payload: { updatedMessage }
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
