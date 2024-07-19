import mongoose from 'mongoose'

// schema for  Creation Date, Domain Name, Expiration Date, Price, Live Status, List Status .
const domainFormSchema = new mongoose.Schema(
  {
    creation_date: {
      type: Date,
      default: Date.now
    },
    domain_holder: { type: String },
    domain_platform: { type: String },
    domain_name: { type: String, required: true },
    expiration_date: { type: Date },
    price: { type: Number, required: true },
    live_status: { type: String },
    list_status: { type: String },
    domainApprovedBy: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
)

export const DomainFormModel = mongoose.models.DomainForm || mongoose.model('DomainForm', domainFormSchema)
