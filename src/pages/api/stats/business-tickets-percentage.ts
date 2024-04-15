import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import mongoose from 'mongoose'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { startDate, employee_id, department_id, endDate } = req.query

      if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid) return res.status(500).send('something went wrong')

      const isSaleEmployee = req.user.role === UserRole.SALE_EMPLOYEE

      const statsAndTickets = await BusinessTicketModel.aggregate([
        {
          $match: {
            $and: [
              {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
              },
              ...(isSaleEmployee ? [{ created_by: new mongoose.Types.ObjectId(req.user._id) }] : []),
              ...(employee_id !== 'undefined'
                ? [{ assignee_employees: new mongoose.Types.ObjectId(employee_id) }]
                : []),
              ...(department_id !== 'undefined'
                ? [{ assignee_depart_id: new mongoose.Types.ObjectId(department_id) }]
                : [])
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'assignee_employees',
            foreignField: '_id',
            as: 'assigneeEmployees'
          }
        },
        {
          $addFields: {
            assignee_employees: {
              $map: {
                input: '$assigneeEmployees',
                as: 'employee',
                in: {
                  _id: '$$employee._id',
                  user_name: '$$employee.user_name'
                }
              }
            }
          }
        },
        {
          $facet: {
            ticketStats: [
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 }
                }
              },
              {
                $group: {
                  _id: null,
                  statuses: {
                    $push: {
                      status: '$_id',
                      count: '$count'
                    }
                  },
                  totalCount: { $sum: '$count' }
                }
              },
              {
                $unwind: '$statuses'
              },
              {
                $project: {
                  _id: 0,
                  status: '$statuses.status',
                  count: '$statuses.count',
                  percentage: { $multiply: [{ $divide: ['$statuses.count', '$totalCount'] }, 100] }
                }
              }
            ],
            Tickets: [
              {
                $project: {
                  _id: 1,
                  status: 1,
                  priority: 1,
                  assignee_employees: {
                    $map: {
                      input: '$assignee_employees',
                      as: 'employee',
                      in: {
                        _id: '$$employee._id',
                        user_name: '$$employee.user_name'
                      }
                    }
                  },
                  assignee_depart_id: 1,
                  assignee_depart_name: 1,
                  outsourced_work: 1,
                  client_reporting_date: 1,
                  due_date: 1,
                  business_id: 1,
                  work_status: 1,
                  notes: 1
                }
              },
              {
                $lookup: {
                  from: 'businesses',
                  localField: 'business_id',
                  foreignField: '_id',
                  as: 'business'
                }
              },
              {
                $unwind: '$business'
              },
              {
                $project: {
                  _id: 1,
                  status: 1,
                  priority: 1,
                  assignee_employees: 1,
                  assignee_depart_id: 1,
                  assignee_depart_name: 1,
                  outsourced_work: 1,
                  client_reporting_date: 1,
                  due_date: 1,
                  business_id: {
                    _id: '$business._id',
                    business_name: '$business.business_name'
                  },
                  work_status: 1,
                  notes: 1
                }
              }
            ]
          }
        }
      ])

      return res.send({
        message: 'Ticket statistics fetched successfully',
        payload: {
          ticketStats: statsAndTickets[0].ticketStats,
          tickets: statsAndTickets[0].Tickets
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(500).send('This is a GET request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
