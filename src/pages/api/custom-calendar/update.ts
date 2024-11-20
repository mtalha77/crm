import { guardWrapper } from 'src/backend/auth.guard'
import connectDb from 'src/backend/DatabaseConnection'
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { year, month_number, start_day, end_day } = req.body

    try {
      const calendar = await CustomCalendarModel.findOne({ year })

      if (!calendar) {
        return res.status(404).json({ message: 'Calendar not found for the specified year' })
      }

      const month = calendar.months.find(m => m.month_number === month_number)

      if (!month) {
        return res.status(404).json({ message: `Month ${month_number} not found in the calendar` })
      }

      // Update start and end dates
      month.start_day = start_day
      month.end_day = end_day

      await calendar.save()

      return res.status(200).json({
        message: 'Month updated successfully',
        payload: { calendar }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(405).send('This is a POST request')
  }
}

export default connectDb(guardWrapper(handler))
