import mongoose from 'mongoose'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const departTicketSchema = new mongoose.Schema(
  {
    business_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    assignee_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignee_depart_name: { type: String, required: true },
    assignor_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart_name: { type: String, required: true },
    outsourced_work: { type: Boolean, default: false },
    due_date: { type: Date, required: true },
    work_status: { type: String, required: true, enum: WorkStatusValues },
    notes: { type: String, required: false, default: '' },
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

const DepartTicketModel = mongoose.models.DepartTicket || mongoose.model('DepartTicket', departTicketSchema)

export default DepartTicketModel
