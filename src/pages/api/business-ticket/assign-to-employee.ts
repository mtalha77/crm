import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import DepartmentModel from 'src/backend/schemas/department.schema'
import NotificationModel from 'src/backend/schemas/notification.schema'
import UserModel from 'src/backend/schemas/user.schema'
import createLog from 'src/backend/utils/createLog'
import { Department } from 'src/shared/enums/Department.enum'
import { NotificationType } from 'src/shared/enums/NotificationType.enum'

import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const user = req.user
      const clientIP = req.clientIP
      let ticketDetail = ''

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.TEAM_LEAD))
        return res.status(403).send('Permission denied.Only Admin and TeamLead can update ticket')
      const { ticketId, userIds } = req.body
      if (!ticketId || !userIds) return res.status(400).send('Fields Missing')
      const uniqueArray = [...new Set(userIds)]
      const mapped = uniqueArray.map((u: any) => new mongoose.Types.ObjectId(u))

      const ticket = await BusinessTicketModel.findById(new mongoose.Types.ObjectId(ticketId))

      if (!ticket) throw new Error('Ticket not found')

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

      if (ticket.assignee_employees && ticket.assignee_employees.length < userIds.length) {
        const user = await UserModel.findById(mapped[mapped.length - 1])
        const business = await BusinessModel.findById({ _id: result.business_id })

        if (!business) throw new Error('Business not found')

        const departments = await DepartmentModel.find({}, {}, { session })

        if (!departments) throw new Error('No departments found')

        const adminDepartment = departments.find(d => d.name === Department.Admin)

        const notificationMsg = `${business.business_name} with ${ticket.work_status} is assigned to ${user.user_name}.`

        ticketDetail = notificationMsg

        const notification = new NotificationModel({
          message: notificationMsg,
          ticket_id: result._id,
          created_by_user_id: new mongoose.Types.ObjectId(req.user._id),
          category: 'Business',
          type: NotificationType.TICKET_ASSIGNED,
          for_user_ids: [user._id],
          for_department_ids: [adminDepartment._id]
        })

        const result4 = await notification.save({ session })

        if (!result4) throw new Error('Not able to create ticket. Please try again')
      }
      await session.commitTransaction()

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} assigned business ticket of business: ${ticketDetail}`
      createLog({ msg: logMsg })

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
