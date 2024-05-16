import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({
    assignee_employees: { $elemMatch: { $eq: req.user._id } }
  })
    .populate({ path: 'business_id', select: 'business_name client_name' })
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
      client_name: 1
    })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
