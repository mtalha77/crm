import mongoose from 'mongoose'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'

export const getAllTicketsForSalesEmployee = async (req: any, res: any) => {
  const tickets = await PaymentHistoryModel.aggregate([
    {
      $match: {
        $or: [
          { closer_id: new mongoose.Types.ObjectId(req.user._id) },
          { fronter_id: new mongoose.Types.ObjectId(req.user._id) }
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
      $lookup: {
        from: 'businesses',
        localField: 'ticket.business_id',
        foreignField: '_id',
        as: 'business'
      }
    },
    {
      $addFields: {
        'ticket.business_id': {
          business_name: { $arrayElemAt: ['$business.business_name', 0] }
        }
      }
    },
    {
      $group: {
        _id: null,
        tickets: { $push: '$ticket' }
      }
    },
    {
      $project: {
        _id: 0,
        tickets: 1
      }
    }
  ])

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets: tickets[0]?.tickets }
  })
}
