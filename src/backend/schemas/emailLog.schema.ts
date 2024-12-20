import mongoose from 'mongoose'

const emailLogSchema = new mongoose.Schema(
  {
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: false }, // Optional for external businesses
    email: { type: String, required: true }, // Ensure email is always provided
    is_external: { type: Boolean, required: true, default: false }, // Flag for external businesses
    sent_templates: [
      {
        template_name: { type: String, required: true },
        sent_at: { type: Date, default: Date.now } // Timestamp of when the template was sent
      }
    ]
  },
  { timestamps: true }
)

const EmailLogModel = mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema)

export default EmailLogModel
