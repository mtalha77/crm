import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const user = req.user
      const clientIP = req.clientIP

      const { id } = req.query
      let business = await BusinessModel.findById(id)

      if (!business) {
        return res.status(404).send('business not found')
      }

      if (req.user?.role === UserRole.TEAM_LEAD) {
        const businesses = await BusinessModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id) // Match the provided business ID
            }
          },

          //get all business tickets associated with this business
          {
            $lookup: {
              from: 'businesstickets',
              localField: '_id',
              foreignField: 'business_id',
              as: 'tickets'
            }
          },

          {
            $addFields: {
              tickets: {
                $filter: {
                  input: '$tickets',
                  as: 'ticket',
                  cond: { $eq: ['$$ticket.assignee_depart_id', new mongoose.Types.ObjectId(req.user?.department_id)] }
                }
              }
            }
          },

          // filter business tickets based on their status to determine whether all tickets are completed
          {
            $addFields: {
              allTicketsCompleted: {
                $cond: {
                  if: {
                    $eq: [
                      {
                        $size: {
                          $filter: { input: '$tickets', as: 'ticket', cond: { $ne: ['$$ticket.status', 'Completed'] } }
                        }
                      },
                      0
                    ]
                  },
                  then: true,
                  else: false
                }
              }
            }
          },

          // update the status of the business
          {
            $addFields: {
              status: {
                $cond: {
                  if: '$allTicketsCompleted',
                  then: 'Inactive',
                  else: 'Active'
                }
              }
            }
          },

          // removing tickets field
          {
            $project: {
              tickets: 0 // Exclude tickets field if not needed
            }
          }
        ])

        business = businesses[0]
      }

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} is attempting to fetch business details of ${business.business_name}`
      createLog({ msg: logMsg })

      return res.send({
        message: 'business fetched successfully',
        payload: { business }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Network error')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
