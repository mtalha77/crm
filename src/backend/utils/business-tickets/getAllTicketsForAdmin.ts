import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForAdmin = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({})
    .populate({ path: 'business_id', select: 'business_name' })
    .populate({ path: 'assignee_employee_id', select: 'user_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
