import mongoose from 'mongoose'
import { SaleType } from 'src/shared/enums/SaleType.enum'

const paymentSessionSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    total_payment: { type: Number, required: true },
    advance_payment: { type: Number, required: true },
    remaining_payment: { type: Number, required: true },
    sales_type: { type: String, enum: SaleType, required: true },
    fronter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: any) {
        return this.sales_type === SaleType.NEW_SALE
      }
    },
    closer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessTicket', required: true },
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    session: { type: Number, required: true }
  },
  { timestamps: true }
)

const PaymentSessionModel = mongoose.models.PaymentSession || mongoose.model('PaymentSession', paymentSessionSchema)

export default PaymentSessionModel
