import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { Department } from 'src/shared/enums/Department.enum'

export const getAllTicketsForSalesManager = async (req: any, res: any) => {
  const tickets = await BusinessTicketModel.find({ assignor_depart_name: Department.Sales })
    .populate({ path: 'business_id', select: 'business_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
