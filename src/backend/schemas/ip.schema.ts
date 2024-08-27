import mongoose from 'mongoose'

const ipSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true }

    // description: { type: String }
  },
  { timestamps: true }
)

const IpModel = mongoose.models.Ip || mongoose.model('Ip', ipSchema)

export default IpModel
