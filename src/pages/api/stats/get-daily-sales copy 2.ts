import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import BaseCalendarModel from 'src/backend/schemas/baseCalendar.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import mongoose from 'mongoose'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { year, month, user_name } = req.query

      if (!year || isNaN(parseInt(year)) || !month || isNaN(parseInt(month))) {
        return res.status(400).send('Invalid year or month provided')
      }

      // Fetch baseCalendar for the specific month
      const baseCalendar = await BaseCalendarModel.findOne({ month_number: parseInt(month) })

      if (!baseCalendar) {
        return res.status(404).send('Custom calendar month not found')
      }

      const start_date = `${year}-${baseCalendar.start_day}`
      const end_date = `${year}-${baseCalendar.end_day}`

      // Aggregate daily sales
      const stats = await PaymentHistoryModel.aggregate([
        {
          $match: {
            $and: [
              { payment_type: PaymentType.Credit },
              { createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) } },
              ...(user_name !== 'undefined'
                ? [
                    {
                      $or: [
                        { fronter_id: new mongoose.Types.ObjectId(user_name) },
                        { closer_id: new mongoose.Types.ObjectId(user_name) }
                      ]
                    }
                  ]
                : [])
            ]
          }
        },
        {
          $project: {
            dayOfMonth: { $dayOfMonth: '$createdAt' },
            full_date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            received_payment: 1
          }
        },
        {
          $group: {
            _id: '$full_date', // Group by the full date
            total_sales: { $sum: '$received_payment' },
            full_date: { $first: '$full_date' }
          }
        },
        {
          $project: {
            _id: 0,
            date: { $dayOfMonth: { $dateFromString: { dateString: '$full_date' } } },
            total_sales: 1,
            full_date: 1
          }
        },
        {
          $sort: { full_date: 1 } // Sort by full_date chronologically
        }
      ])


      return res.send({
        message: 'Daily payment history fetched successfully',
        payload: { stats }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(405).send('This is a GET request')
  }
}

const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
