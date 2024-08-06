import mongoose, { PipelineStage } from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      let analytics = []
      const basePipeline: PipelineStage[] = [
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
          analytics = await BusinessTicketModel.aggregate(basePipeline)
          break

        case UserRole.TEAM_LEAD:
          const teamLeadPipeline: PipelineStage[] = [
            {
              $match: {
                assignee_depart_id: new mongoose.Types.ObjectId(req.user.department_id)
              }
            },
            {
              $group: {
                _id: {
                  status: '$status',
                  otherSales: '$otherSales'
                },
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                status: '$_id.status',
                otherSales: '$_id.otherSales',
                count: 1,
                _id: 0
              }
            },
            {
              $group: {
                _id: '$status',
                count: {
                  $sum: {
                    $cond: [
                      {
                        $and: [{ $eq: ['$status', 'Not Started Yet'] }, { $eq: ['$otherSales', true] }]
                      },
                      0,
                      '$count'
                    ]
                  }
                }
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
          analytics = await BusinessTicketModel.aggregate(teamLeadPipeline)
          break

        case UserRole.EMPLOYEE:
          basePipeline.unshift({
            $match: {
              assignee_employees: { $elemMatch: { $eq: new mongoose.Types.ObjectId(req.user._id) } }
            }
          })
          analytics = await BusinessTicketModel.aggregate(basePipeline)
          break

        case UserRole.SALE_EMPLOYEE:
          basePipeline.unshift({
            $match: {
              created_by: new mongoose.Types.ObjectId(req.user._id)
            }
          })
          analytics = await BusinessTicketModel.aggregate(basePipeline)
          break

        case UserRole.SALE_MANAGER:
          analytics = await BusinessTicketModel.aggregate(basePipeline)
          break

        default:
          return res.status(403).send('Forbidden')
      }

      if (!analytics) {
        return res.status(404).send('Network Error')
      }

      return res.send({
        message: 'ticket analytics fetched successfully',
        payload: { analytics }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
