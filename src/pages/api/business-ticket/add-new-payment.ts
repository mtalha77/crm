import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import dayjs from 'dayjs'

const handler = async (req: any, res: any) => {
  if (req.method === 'PATCH') {
    const session = await mongoose.startSession()

    try {
      session.startTransaction()

      if (!(req.user.role === UserRole.ADMIN || req.user.role === UserRole.SALE_MANAGER))
        return res.status(403).send('Permission denied')

      const { ticketId, total_payment, advance_payment, remaining_payment, closer_id, client_reporting_date } = req.body
      if (
        !ticketId ||
        !total_payment ||
        !advance_payment ||
        remaining_payment === undefined ||
        !closer_id ||
        !client_reporting_date
      )
        return res.status(400).send('Fields Missing')

      const ticket = await BusinessTicketModel.findById(ticketId).session(session)
      if (!ticket) throw new Error('No ticket found')

      const newClientReportingDate = dayjs(client_reporting_date).toDate()

      const updatedTicket = await BusinessTicketModel.findByIdAndUpdate(
        ticketId,
        { $inc: { current_session: 1 }, client_reporting_date: newClientReportingDate },
        { new: true, session }
      )

      if (!ticket) throw new Error('No ticket found')

      const newPaymentSession = new PaymentSessionModel({
        total_payment: total_payment,
        advance_payment: advance_payment,
        remaining_payment: total_payment - advance_payment,
        closer_id: closer_id,
        business_id: updatedTicket.business_id,
        sales_type: SaleType.RECURRING_SALE,
        ticket_id: updatedTicket._id,
        session: updatedTicket.current_session
      })

      const savedPaymentSession = await newPaymentSession.save({ session })

      if (!savedPaymentSession) throw new Error('not able to save payment session')

      const newPaymentHistory = new PaymentHistoryModel({
        received_payment: advance_payment,
        payment_type: PaymentType.Credit,
        remaining_payment: total_payment - advance_payment,
        ticket_id: updatedTicket._id,
        payment_session_id: savedPaymentSession._id,
        business_id: updatedTicket.business_id,
        session: updatedTicket.current_session,
        sales_type: SaleType.RECURRING_SALE,
        closer_id
      })
      const savedPaymentHistory = await newPaymentHistory.save({ session })
      if (!savedPaymentHistory) throw new Error('Not able to save payment history')

      await session.commitTransaction()

      return res.send({
        message: `Payment history updated`,
        payload: {}
      })
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      res.status(500).send('something went wrong')
    } finally {
      if (session) session.endSession()
    }
  } else {
    res.status(500).send('this is a patch request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
