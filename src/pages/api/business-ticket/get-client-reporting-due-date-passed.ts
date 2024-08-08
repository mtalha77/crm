import dayjs from 'dayjs'
import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { date } = req.query
      if (!dayjs(date).isValid()) return res.status(500).send('something went wrong')

      // const monthStart = dayjs(date).startOf('month').toDate()
      let tickets = []

      switch (req.user.role) {
        case UserRole.ADMIN:
          tickets = await BusinessTicketModel.find({
            // client_reporting_date: { $gte: new Date(monthStart), $lte: new Date(date) },
            client_reporting_date: { $lte: new Date(date) },

            status: { $ne: TicketStatus.COMPLETED }
          })
            .populate('business_id', 'business_name')
            .select({
              status: 1,
              priority: 1,
              assignee_depart_name: 1,
              client_reporting_date: 1,

              // due_date: 1,
              business_id: 1,
              createdAt: 1
            })
          break

        case UserRole.SALE_MANAGER:
          tickets = await BusinessTicketModel.find({
            // client_reporting_date: { $gte: new Date(monthStart), $lte: new Date(date) },
            client_reporting_date: { $lte: new Date(date) },

            status: { $ne: TicketStatus.COMPLETED }
          })
            .populate('business_id', 'business_name')
            .select({
              status: 1,
              priority: 1,
              assignee_depart_name: 1,
              client_reporting_date: 1,

              // due_date: 1,
              business_id: 1,
              createdAt: 1
            })
          break

        case UserRole.TEAM_LEAD:
          tickets = await BusinessTicketModel.find({
            assignee_depart_id: new mongoose.Types.ObjectId(req.user.department_id),

            // client_reporting_date: { $gte: new Date(monthStart), $lte: new Date(date) },

            client_reporting_date: { $lte: new Date(date) },
            status: { $ne: TicketStatus.COMPLETED }
          })
            .populate('business_id', 'business_name')
            .select({
              status: 1,
              priority: 1,
              assignee_depart_name: 1,
              client_reporting_date: 1,

              // due_date: 1,
              business_id: 1,
              createdAt: 1
            })
          break

        default:
          break
      }

      return res.send({
        message: 'tickets fetched successfully',
        payload: { tickets }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
