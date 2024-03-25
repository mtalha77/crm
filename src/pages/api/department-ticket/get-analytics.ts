import mongoose, { PipelineStage } from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    let analytics = []
    try {
      const pipeline: PipelineStage[] = [
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            statusCounts: {
              $push: {
                k: '$_id',
                v: '$count'
              }
            }
          }
        },
        {
          $replaceRoot: {
            newRoot: { $arrayToObject: '$statusCounts' }
          }
        }
      ]
      switch (req.user.role) {
        case UserRole.ADMIN:
          analytics = await DepartTicketModel.aggregate(pipeline)
          break

        case UserRole.TEAM_LEAD:
          pipeline.unshift({
            $match: {
              assignee_depart_id: new mongoose.Types.ObjectId(req.user.department_id)
            }
          })
          analytics = await DepartTicketModel.aggregate(pipeline)
          break

        case UserRole.EMPLOYEE:
          pipeline.unshift({
            $match: {
              assignee_employees: { $elemMatch: { $eq: new mongoose.Types.ObjectId(req.user._id) } }
            }
          })
          analytics = await DepartTicketModel.aggregate(pipeline)
          break

        default:
          break
      }

      if (!analytics) {
        return res.status(404).send('Network Error')
      }

      return res.send({
        message: 'ticket analytics fetched successfully',
        payload: { analytics }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
