import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      //get message information
      const { businessTicketId, content } = req.body

      //check if business ticket exists
      const businessTicket = await BusinessTicketModel.findById(businessTicketId)
      if (!businessTicket) return res.status(404).send('business ticket not found')

      //add new message to business ticket and populate the sender field with the user's details
      const businessTicketWithNewMessage = await BusinessTicketModel.findByIdAndUpdate(
        businessTicketId,
        { $push: { messages: { content, sender: req.user._id, createdAt: new Date() } } },
        { new: true }
      ).populate('messages.sender', '-password')

      //get the latest message from the updated business ticket
      const newMessage = businessTicketWithNewMessage?.messages.slice(-1)[0]

      //if any error getting message from DB
      if (!newMessage) return res.status(500).send('error getting message')

      //send the message back to the client
      return res.send({
        message: 'message send successfully',
        payload: { newMessage }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
