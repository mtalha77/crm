import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import createLog from 'src/backend/utils/createLog'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const session = await mongoose.startSession()
    try {
      const user = req.user
      const clientIP = req.clientIP

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER))
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')

      session.startTransaction()
      const { sessionId, fronterId } = req.body

      if (!fronterId || !sessionId) throw new Error('Fields missing from request')

      const result = await PaymentHistoryModel.updateMany(
        { payment_session_id: new mongoose.Types.ObjectId(sessionId) },
        {
          $set: {
            fronter_id: new mongoose.Types.ObjectId(fronterId)
          }
        }
      )

      if (result.matchedCount !== result.modifiedCount) throw new Error('Not able to update fronter')

      const updatedSession = await PaymentSessionModel.findByIdAndUpdate(sessionId, {
        $set: {
          fronter_id: new mongoose.Types.ObjectId(fronterId)
        }
      })

      if (!updatedSession) throw new Error('Not able to update fronter')

      await session.commitTransaction()

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} changed fronter information`
      createLog({ msg: logMsg })

      return res.send({
        message: ``,
        payload: {}
      })
    } catch (error) {
      console.log(error)
      await session.abortTransaction()

      return res.status(500).send('Something went wrong')
    } finally {
      if (session) session.endSession()
    }
  } else {
    res.status(500).send('this is a patch request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
