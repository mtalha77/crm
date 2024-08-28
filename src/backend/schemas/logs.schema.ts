import { Log } from 'src/shared/enums/Log.enum'

import mongoose from 'mongoose'

const logSchema = new mongoose.Schema(
  {
    msg: { type: String, required: true },
    level: {
      type: String,
      enum: Log,
      required: true,
      default: 'info'
    }
  },
  { timestamps: true }
)

const LogModel = mongoose.models.Log || mongoose.model('Log', logSchema)

export default LogModel
