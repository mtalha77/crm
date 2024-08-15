import mongoose from 'mongoose'
import { BusinessStatus } from 'src/shared/enums/BusinessStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const businessSchema = new mongoose.Schema(
  {
    business_name: { type: String, required: true, unique: true },
    business_number: { type: String, required: false },
    business_hours: { type: String, required: false },
    business_email: { type: String, required: true },
    state: { type: String, required: false },
    country: { type: String, required: false },
    street: { type: String, required: false },
    zip_code: { type: String, required: false },
    social_profile: { type: String, required: false },
    website_url: { type: String, required: false },
    gmb_url: { type: String, required: false, trim: true },
    work_status: [
      {
        type: String,
        enum: WorkStatusValues,
        required: true
      }
    ],
    status: { type: String, enum: BusinessStatus, default: BusinessStatus.ACTIVE },
    client_name: { type: String, required: false, trim: true },
    domains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DomainForm' }],
    hostings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HostingForm' }]
  },
  { timestamps: true }
)

const BusinessModel = mongoose.models.Business || mongoose.model('Business', businessSchema)

export default BusinessModel
