import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { Department } from 'src/shared/enums/Department.enum'

export const getAllTicketsForSalesEmployee = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({ assignor_depart_name: Department.Sales })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
