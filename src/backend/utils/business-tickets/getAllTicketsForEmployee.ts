import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({
    assignee_employees: { $elemMatch: { $eq: req.user._id } }
  })
    .populate({ path: 'business_id', select: 'business_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
