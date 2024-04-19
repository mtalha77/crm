import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { startDate, endDate } = req.query

      if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid) return res.status(500).send('something went wrong')

      const result = await PaymentHistoryModel.aggregate([
        {
          $match: {
            $and: [
              {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'businesstickets',
            localField: 'ticket_id',
            foreignField: '_id',
            as: 'ticket'
          }
        },
        {
          $unwind: '$ticket'
        },
        {
          $group: {
            _id: '$ticket.work_status',
            totalReceivedPayment: { $sum: '$received_payment' }
          }
        },
        {
          $sort: { totalReceivedPayment: -1 }
        }
      ])

      return res.send({
        message: 'payment history fetched successfully',
        payload: { stats: result }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
