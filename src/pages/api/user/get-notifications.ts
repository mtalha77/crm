import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import NotificationModel from 'src/backend/schemas/notification.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).send('This is a POST request')
  }

  try {
    const { role, department_id } = req.user
    let notifications: any = []

    switch (role) {
      case UserRole.ADMIN:
      case UserRole.SALE_MANAGER:
        notifications = await NotificationModel.find({
          for_department_ids: new mongoose.Types.ObjectId(department_id)
        }).sort({ createdAt: -1 })
        break

      case UserRole.TEAM_LEAD: {
        const filteredNotifications = await NotificationModel.find({
          for_department_ids: new mongoose.Types.ObjectId(department_id)
        })
          .populate('ticket_id') // Populate ticket_id without filtering
          .sort({ createdAt: -1 })

        // Manually filter notifications where ticket_id.otherSales is false
        notifications = filteredNotifications.filter(
          notification => notification.ticket_id && notification.ticket_id.otherSales === false
        )
        break
      }

      case UserRole.EMPLOYEE: {
        const filteredNotifications = await NotificationModel.find({
          for_user_ids: new mongoose.Types.ObjectId(req.user._id)
        })
          .populate('ticket_id') // Populate ticket_id without filtering
          .sort({ createdAt: -1 })

        // Manually filter notifications where ticket_id.otherSales is false
        notifications = filteredNotifications.filter(
          notification => notification.ticket_id && notification.ticket_id.otherSales === false
        )
        break
      }

      default:
        return res.status(403).send('Unauthorized role')
    }

    return res.send({
      message: 'Notifications fetched successfully',
      payload: { notifications }
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
