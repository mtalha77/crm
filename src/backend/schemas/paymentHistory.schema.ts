import mongoose from 'mongoose'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'

const paymentHistorySchema = new mongoose.Schema(
  {
    received_amount: { type: Number, required: true },
    payment_type: { type: String, enum: PaymentType, required: true },
    remaining_amount: { type: Number, required: true },
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessTicket', required: true },
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    payment_session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentSession', required: true },
    session: { type: Number, required: true },
    sales_type: { type: String, enum: SaleType, required: true },
    fronter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: any) {
        return this.sales_type === SaleType.NEW_SALE
      }
    },
    closer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

const PaymentHistoryModel = mongoose.models.PaymentHistory || mongoose.model('PaymentHistory', paymentHistorySchema)

export default PaymentHistoryModel
