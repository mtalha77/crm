import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      //get message information
      const { businessTicketId } = req.body

      //check if business ticket exists
      const businessTicket = await BusinessTicketModel.findById(businessTicketId)
        .populate('messages.sender', '-password')
        .populate('business_id')
      if (!businessTicket) return res.status(404).send('business ticket not found')

      //get the latest message from the updated business ticket to send back in the response
      const chatHistory = businessTicket?.messages

      //if any error getting chat history from DB
      if (!chatHistory) return res.status(500).send('error getting chat history')

      //send chat history to client side
      return res.send({
        message: 'message send successfully',

        // payload: { chatHistory, loggedInUserId: req.user._id }
        payload: { businessTicket, loggedInUserId: req.user._id }
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
