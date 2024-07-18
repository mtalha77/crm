import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import NotificationModel from 'src/backend/schemas/notification.schema'
import UserModel from 'src/backend/schemas/user.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { role, department_id } = req.user
      let notifications: any = []
      switch (role) {
        case UserRole.ADMIN:
          notifications = await NotificationModel.find({
            for_department_ids: new mongoose.Types.ObjectId(department_id)
          }).sort({ createdAt: -1 })
          break
        case UserRole.TEAM_LEAD:
          notifications = await NotificationModel.find({
            for_department_ids: new mongoose.Types.ObjectId(department_id)
          }).sort({ createdAt: -1 })
          break

        case UserRole.SALE_MANAGER:
          notifications = await NotificationModel.find({
            for_department_ids: new mongoose.Types.ObjectId(department_id)
          }).sort({ createdAt: -1 })
          break

        case UserRole.EMPLOYEE:
          notifications = await NotificationModel.find({
            for_user_ids: new mongoose.Types.ObjectId(req.user._id)
          }).sort({ createdAt: -1 })
          break

        default:
          break
      }

      return res.send({
        message: 'users fetched successfully',
        payload: { notifications }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a POST request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
