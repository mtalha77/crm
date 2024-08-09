import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      //get message information
      const user = req.user

      /// Fetch messages based on user role
      let businessTickets
      if (user.role === UserRole.ADMIN || user.role === UserRole.SALE_MANAGER) {
        // Fetch all tickets for admins and sales managers
        businessTickets = await BusinessTicketModel.find()
          .populate({
            path: 'business_id',
            select: 'business_name' // Specify fields to include from `business_id`
          })
          .populate('messages.sender')
          .exec()
      } else if (user.role === UserRole.TEAM_LEAD) {
        // Fetch tickets where user is in the assignee_employees (as Team Leader) array
        businessTickets = await BusinessTicketModel.find({
          assignee_depart_name: user.department_name
        })
          .populate({
            path: 'business_id',
            select: 'business_name' // Specify fields to include from `business_id`
          })
          .select('business_name')
          .populate('messages.sender')
          .exec()
      } else {
        return res.send({
          message: 'No message available',
          payload: {}
        })
      }

      // Extract messages from tickets
      // const messages = businessTickets.flatMap(ticket => ticket.messages)
      const messages = businessTickets.flatMap(ticket =>
        ticket.messages.map(message => {
          const plainMessage = message.toObject() // Convert Mongoose document to plain JS object
          plainMessage.businessTicketsId = ticket._id // Add the businessTicketsId property
          plainMessage.business_name = ticket.business_id.business_name // Add the businessTicketsId property
          plainMessage.work_status = ticket.work_status // Add the businessTicketsId property

          console.log('plainMessage.business_name: ', plainMessage.business_name)

          return plainMessage
        })
      )

      //if any error getting unread messages from DB
      if (!messages) return res.status(500).send('error getting unread messages')

      //sort messages by createdAt in descending order to get the latest first
      messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      //send unread messages to client side
      return res.send({
        message: 'messages get successfully',
        payload: { unreadMessages: messages }
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
