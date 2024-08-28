import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    let businesses = []
    try {
      if (req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.SALE_MANAGER) {
        businesses = await BusinessModel.aggregate([
          //get all business tickets associated with each business
          {
            $lookup: {
              from: 'businesstickets',
              localField: '_id',
              foreignField: 'business_id',
              as: 'tickets'
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
      } else if (req.user?.role === UserRole.TEAM_LEAD) {
        businesses = await BusinessTicketModel.aggregate([
          // get all business tickets associated with the user's department
          {
            $match: {
              assignee_depart_id: new mongoose.Types.ObjectId(req.user?.department_id)
            }
          },

          // group all the tickets by their department
          {
            $group: {
              _id: '$business_id',
              tickets: { $push: '$$ROOT' }
            }
          },

          // get the business details for each group
          {
            $lookup: {
              from: 'businesses',
              localField: '_id',
              foreignField: '_id',
              as: 'business'
            }
          },

          // unwind the array of tickets to get each ticket
          { $unwind: '$business' },

          // filter business tickets based on their status to determine whether all tickets are completed
          {
            $addFields: {
              allDeptTicketsCompleted: {
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
                  if: '$allDeptTicketsCompleted',
                  then: 'Inactive',
                  else: 'Active'
                }
              }
            }
          },

          // replace each document with its business information with the updated status
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: ['$business', { status: '$status' }]
              }
            }
          }
        ])
      }

      return res.send({
        message: 'businesses fetched successfully',
        payload: { businesses }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
