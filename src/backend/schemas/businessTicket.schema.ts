import mongoose from 'mongoose'
import { Department } from 'src/shared/enums/Department.enum'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

export const childTicketSchema = new mongoose.Schema({
  child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DepartTicket', required: true }
})

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  readBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: [UserRole.TEAM_LEAD, UserRole.SALE_MANAGER, UserRole.ADMIN]
      },
      readAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

const businessTicketSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    current_session: { type: Number, required: true, default: 1 },
    child_tickets: { type: [childTicketSchema], required: false },
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_employees: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false },
    assignee_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignee_depart_name: { type: String, required: true },
    assignor_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart_name: { type: String, required: true },
    outsourced_work: { type: Boolean, default: false },
    client_reporting_date: { type: Date, required: false },
    remaining_price_date: { type: Date, required: false },

    // due_date: { type: Date, required: true },

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
    work_status: {
      type: String,
      required: function (this: any) {
        return this.assignee_depart_name !== Department.Writer && this.assignee_depart_name !== Department.Designer
      },
      enum: WorkStatusValues
    },
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
    no_of_gmb_reviews: { type: String, required: false, trim: true },
    gmb_access_email: { type: String, required: false, trim: true },
    ticket_notes: { type: String, required: false, trim: true, maxLength: 2000 },
    client_reporting_notes: { type: String, required: false, trim: true, maxLength: 2000 },
    task_details: { type: String, required: false, trim: true },
    otherSales: { type: Boolean, required: true },
    messages: [MessageSchema]
  },
  { timestamps: true }
)

export const BusinessTicketModel =
  mongoose.models.BusinessTicket || mongoose.model('BusinessTicket', businessTicketSchema)
