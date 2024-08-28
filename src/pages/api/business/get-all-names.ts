import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import createLog from 'src/backend/utils/createLog';
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {

      const user = req.user
      const clientIP = req.clientIP

      let businesses = []
      switch (req.user?.role) {
        case UserRole.ADMIN:
          businesses = await BusinessModel.find({}).select({ business_name: 1 })
          break

        case UserRole.SALE_MANAGER:
          businesses = await BusinessModel.find({}).select({ business_name: 1 })
          break

        case UserRole.SALE_EMPLOYEE:
          businesses = await BusinessTicketModel.aggregate([
            {
              $match: {
                created_by: new mongoose.Types.ObjectId(req.user?._id)
              }
            },
            {
              $group: {
                _id: '$business_id'
              }
            },
            {
              $lookup: {
                from: 'businesses',
                localField: '_id',
                foreignField: '_id',
                as: '_id'
              }
            },
            {
              $replaceRoot: { newRoot: { $arrayElemAt: ['$_id', 0] } }
            },
            {
              $project: {
                business_name: 1
              }
            }
          ])
          break

        case UserRole.TEAM_LEAD:
          businesses = await BusinessTicketModel.aggregate([
            {
              $match: {
                assignee_depart_id: new mongoose.Types.ObjectId(req.user?.department_id)
              }
            },
            {
              $group: {
                _id: '$business_id'
              }
            },
            {
              $lookup: {
                from: 'businesses',
                localField: '_id',
                foreignField: '_id',
                as: '_id'
              }
            },
            {
              $replaceRoot: { newRoot: { $arrayElemAt: ['$_id', 0] } }
            },
            {
              $project: {
                business_name: 1
              }
            }
          ])
          break

        default:
          break
      }

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} is attempting to fetch all businesses names`
      createLog({ msg: logMsg })

      return res.send({
        message: 'businesses fetched successfully',
        payload: { businesses }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
