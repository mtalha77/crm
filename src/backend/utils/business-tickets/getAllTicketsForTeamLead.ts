import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsTeamLead = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({ assignee_depart_id: req.user.department_id })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
