import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import NotificationModel from 'src/backend/schemas/notification.schema'
import { NotificationType } from 'src/shared/enums/NotificationType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.TEAM_LEAD))
        return res.status(403).send('Permission denied.Only Admin and TeamLead can update ticket')
      const { ticketId, userIds } = req.body
      if (!ticketId || !userIds) return res.status(400).send('Fields Missing')
      const uniqueArray = [...new Set(userIds)]
      const mapped = uniqueArray.map((u: any) => new mongoose.Types.ObjectId(u))

      const result = await BusinessTicketModel.findByIdAndUpdate(
        ticketId,
        {
          $set: {
            assignee_employees: mapped
          }
        },
        { session }
      )

      if (!result) return res.status(500).send('Not able to assign ticket.Please try again')

      const notificationMsg = `A new ticket has been assigned by ${req.user.user_name}`
      const notification = new NotificationModel({
        message: notificationMsg,
        ticket_id: result._id,
        created_by_user_id: new mongoose.Types.ObjectId(req.user._id),
        category: 'Business',
        type: NotificationType.TICKET_ASSIGNED,
        for_user_ids: mapped
      })

      const result4 = await notification.save({ session })

      if (!result4) throw new Error('Not able to create ticket. Please try again')

      await session.commitTransaction()

      return res.send({
        message: 'success',
        payload: {}
      })
    } catch (error) {
      console.log(error)
      await session.abortTransaction()

      return res.status(500).send('something went wrong')
    } finally {
      if (session) session.endSession()
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
