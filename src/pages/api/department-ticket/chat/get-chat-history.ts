import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      //get message information
      const { departmentTicketId } = req.body

      //check if department ticket exists
      const departmentTicket = await DepartTicketModel.findById(departmentTicketId).populate(
        'messages.sender',
        '-password'
      )
      if (!departmentTicket) return res.status(404).send('department ticket not found')

      //get the latest message from the updated department ticket to send back in the response
      const chatHistory = departmentTicket?.messages

      //if any error getting chat history from DB
      if (!chatHistory) return res.status(500).send('error getting chat history')

      //send chat history to client side
      return res.send({
        message: 'message send successfully',
        payload: { chatHistory, loggedInUserId: req.user._id }
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
