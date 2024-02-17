import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({ employee_id: req.user._id })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
