import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema';
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import createLog from 'src/backend/utils/createLog';
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    try {

      const user = req.user
      const clientIP = req.clientIP

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER))
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')

      const { id, closerId } = req.body
      if (!closerId || !id) return res.status(400).send('Fields Missing')

      const result = await PaymentHistoryModel.findByIdAndUpdate(id, {
        $set: {
          closer_id: new mongoose.Types.ObjectId(closerId)
        }
      })

      if (!result) return res.status(500).send('Network Error')

      const business = await BusinessModel.findById(result.business_id)

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} change closer information of business ${business.business_name}`
      createLog({ msg: logMsg })


      return res.send({
        message: ``,
        payload: {}
      })
    } catch (error) {
      console.log(error)

      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a patch request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
