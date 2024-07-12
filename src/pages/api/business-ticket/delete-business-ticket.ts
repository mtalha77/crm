import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'DELETE') {
    const { role } = req.user
    const { ticketId } = req.body

    if (!(role === UserRole.ADMIN || role === UserRole.SALE_EMPLOYEE || role === UserRole.SALE_MANAGER))
      return res.status(403).send('Permission denied. Only Admin and Sales can delete ticket')

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const ticket = await BusinessTicketModel.findById(ticketId)

      if (!ticket) {
        return res.status(404).send('Ticket not found')
      }

      await PaymentHistoryModel.deleteMany({ ticket_id: ticketId }, { session })
      await PaymentSessionModel.deleteMany({ ticket_id: ticketId }, { session })
      await BusinessTicketModel.findByIdAndDelete(ticketId, { session })

      await session.commitTransaction()

      return res.send({ message: 'Ticket and associated data deleted successfully' })
    } catch (error) {
      console.error(error)
      await session.abortTransaction()

      return res.status(500).send('Failed to delete ticket')
    } finally {
      if (session) session.endSession()
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}

const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
