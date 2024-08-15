import mongoose from 'mongoose'

// schema for  Creation Date, hosting Name, Expiration Date, Price, Live Status, List Status .
const hostingFormSchema = new mongoose.Schema(
  {
    creation_date: {
      type: Date,
      default: Date.now
    },
    hosting_holder: { type: String },
    hosting_platform: { type: String },
    hosting_name: { type: String, required: true },
    expiration_date: { type: Date },
    price: { type: Number, required: true },
    live_status: { type: String },
    list_status: { type: String },
    hostingApprovedBy: { type: String },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    notes: { type: String }
  },
  { timestamps: true }
)

export const HostingFormModel = mongoose.models.HostingForm || mongoose.model('HostingForm', hostingFormSchema)
