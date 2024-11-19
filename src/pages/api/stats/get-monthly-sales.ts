import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import BaseCalendarModel from 'src/backend/schemas/baseCalendar.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import utc from 'dayjs/plugin/utc'
import mongoose from 'mongoose'

dayjs.extend(utc)

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { year, user_name } = req.query

      if (!year || isNaN(parseInt(year))) {
        return res.status(400).send('Invalid year provided')
      }

      // Fetch custom calendar from the database
      const baseCalendar = await BaseCalendarModel.find({}).sort({ month_number: 1 })

      if (!baseCalendar || baseCalendar.length === 0) {
        return res.status(404).send('Custom calendar not found')
      }

      // Generate dynamic calendar with year
      const customCalendar = baseCalendar.map(month => ({
        ...month.toObject(),
        start_date: `${year}-${month.start_day}`,
        end_date: `${year}-${month.end_day}`
      }))

      // Aggregate sales by custom calendar months
      const stats = await Promise.all(
        customCalendar.map(async month => {
          const totalSales = await PaymentHistoryModel.aggregate([
            {
              $match: {
                $and: [
                  { payment_type: PaymentType.Credit },
                  {
                    createdAt: {
                      $gte: new Date(month.start_date),
                      $lte: new Date(month.end_date)
                    }
                  },
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
              $group: {
                _id: null,
                total_sales: { $sum: '$received_payment' }
              }
            }
          ])

          return {
            month: month.month_number,
            total_sales: totalSales[0]?.total_sales || 0
          }
        })
      )

      return res.send({
        message: 'Payment history fetched successfully',
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
