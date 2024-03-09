import mongoose from 'mongoose'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

export const childTicketSchema = new mongoose.Schema({
  child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DepartTicket', required: true }
})

const businessTicketSchema = new mongoose.Schema(
  {
    current_session: { type: Number, required: true, default: 1 },
    child_tickets: { type: [childTicketSchema], required: false },
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    assignee_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignee_depart_name: { type: String, required: true },
    assignor_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart_name: { type: String, required: true },
    outsourced_work: { type: Boolean, default: false },
    client_reporting_date: { type: Date, required: false },
    due_date: { type: Date, required: true },
    fronter: {
      type: String,
      trim: true,
      required: function (this: any) {
        return this.sales_type === SaleType.NEW_SALE
      }
    },
    fronter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: any) {
        return this.sales_type === SaleType.NEW_SALE
      }
    },
    closer: { type: String, required: true, trim: true },
    closer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    business_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    sales_type: { type: String, enum: SaleType, required: true },
    work_status: { type: String, required: true, enum: WorkStatusValues },
    notes: { type: String, required: false, default: '', trim: true },
    service_name: { type: String, required: false, trim: true },
    service_area: { type: String, required: false, trim: true },
    referral_website: { type: String, required: false, trim: true },
    service_location: { type: String, required: false, trim: true },
    key_words: { type: String, required: false, trim: true },
    login_credentials: { type: String, required: false, trim: true },
    console_access: { type: String, required: false, trim: true },
    analytics_access: { type: String, required: false, trim: true },
    paid_marketing_location: { type: String, required: false, trim: true },
    ad_account_access: { type: String, required: false, trim: true },
    budget: { type: String, required: false, trim: true },
    budget_price: { type: Number, required: false },
    clients_objectives: { type: String, required: false, trim: true },
    facebook_url: { type: String, required: false, trim: true },
    no_of_backlinks: { type: String, required: false, trim: true },
    no_of_posts: { type: String, required: false, trim: true },
    no_of_blogs: { type: String, required: false, trim: true },
    platform_name: { type: String, required: false, trim: true },
    no_of_likes: { type: String, required: false, trim: true },
    no_of_gmb_reviews: { type: String, required: false, trim: true }
  },
  { timestamps: true }
)

export const BusinessTicketModel =
  mongoose.models.BusinessTicket || mongoose.model('BusinessTicket', businessTicketSchema)
