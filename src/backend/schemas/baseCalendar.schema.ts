import mongoose from 'mongoose'

const BaseCalendarSchema = new mongoose.Schema(
  {
    month_number: { type: Number, required: true, unique: true },
    month_name: { type: String, required: true },
    start_day: { type: String, required: true }, // Format: MM-DD
    end_day: { type: String, required: true } // Format: MM-DD
  },
  { timestamps: true }
)

const BaseCalendarModel = mongoose.models.BaseCalendar || mongoose.model('BaseCalendar', BaseCalendarSchema)
export default BaseCalendarModel
