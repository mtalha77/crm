import mongoose from 'mongoose';

const MonthSchema = new mongoose.Schema({
  month_number: { type: Number, required: true },
  month_name: { type: String, required: true },
  start_day: { type: String, required: true }, // Format: MM-DD
  end_day: { type: String, required: true },   // Format: MM-DD
});

const CustomCalendarSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, unique: true }, // Year-specific calendar
    months: {
      type: [MonthSchema], // Array of months (12 objects for each year)
      validate: [
        {
          validator: (months) => months.length === 12,
          message: 'Each year must have exactly 12 months.',
        },
      ],
    },
  },
  { timestamps: true }
);

const CustomCalendarModel =
  mongoose.models.CustomCalendar || mongoose.model('CustomCalendar', CustomCalendarSchema);

export default CustomCalendarModel;
