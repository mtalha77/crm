import mongoose from 'mongoose'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForAdmin = async (req: any, res: any) => {
  let businessId = req.query.businessId

  let filters = {}
  if (businessId !== 'undefined') {
    businessId = new mongoose.Types.ObjectId(businessId)

    filters = { business_id: businessId }
  }
  const tickets = await BusinessTicketModel.find(filters)
    .populate({ path: 'business_id', select: 'business_name' })
    .populate({ path: 'assignee_employee_id', select: 'user_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
