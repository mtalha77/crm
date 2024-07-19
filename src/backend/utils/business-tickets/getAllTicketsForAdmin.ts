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
    .populate({ path: 'business_id', select: 'business_name client_name' })
    .populate({ path: 'assignee_employees', select: 'user_name' })
    .sort({ createdAt: -1 })
    .select({
      status: 1,
      priority: 1,
      assignee_depart_name: 1,
      client_reporting_date: 1,

      // due_date: 1,
      business_id: 1,
      createdAt: 1,
      assignee_employees: 1,
      assignee_depart_id: 1,
      assignor_depart_id: 1,
      assignor_depart_name: 1,
      work_status: 1,
      client_name: 1,
      otherSales: 1
    })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
