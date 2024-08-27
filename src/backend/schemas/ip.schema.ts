import mongoose from 'mongoose'

const ipSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true }
  },
  { timestamps: true }
)

const IpModel = mongoose.models.Ip || mongoose.model('Ip', ipSchema)

export default IpModel
