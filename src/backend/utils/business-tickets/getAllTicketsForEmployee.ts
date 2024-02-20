import mongoose from 'mongoose'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({
    assignee_employee_id: new mongoose.Types.ObjectId(req.user._id)
  }).populate({ path: 'business_id', select: 'business_name' })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
