import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import NotificationModel from 'src/backend/schemas/notification.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { newNotificationsIds } = req.body
      const ids = newNotificationsIds.map((n: string) => new mongoose.Types.ObjectId(n))

      const result = await NotificationModel.updateMany({ _id: { $in: ids } }, { $set: { read: true } })

      if (!result) return res.status(404).send('No notifications found')

      return res.send({
        message: 'users fetched successfully',
        payload: {}
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
