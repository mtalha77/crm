import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { date } = req.query
      if (!dayjs(date).isValid()) return res.status(500).send('something went wrong')

      const monthStart = dayjs(date).startOf('month').toDate()

      const tickets = await BusinessTicketModel.find({
        client_reporting_date: { $gte: new Date(monthStart), $lte: new Date(date) }
      })
        .populate('business_id', 'business_name')
        .select({
          status: 1,
          priority: 1,
          assignee_depart_name: 1,
          due_date: 1,
          business_id: 1,
          createdAt: 1
        })

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
