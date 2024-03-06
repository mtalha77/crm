import mongoose from 'mongoose'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForSalesEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({ created_by: new mongoose.Types.ObjectId(req.user._id) })
    .populate({ path: 'business_id', select: 'business_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
