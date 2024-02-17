import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsForAdmin = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({})

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
