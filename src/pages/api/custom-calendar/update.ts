import connectDb from 'src/backend/DatabaseConnection'
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { id, ...updateData } = req.body

      // Validate date range overlap
      const existingCalendars = await CustomCalendarModel.find({
        _id: { $ne: id },
        $or: [
          {
            start_day: {
              $lte: updateData.end_day,
              $gte: updateData.start_day
            }
          },
          {
            end_day: {
              $lte: updateData.end_day,
              $gte: updateData.start_day
            }
          }
        ]
      })

      if (existingCalendars.length > 0) {
        const conflictDetails = existingCalendars
          .map(cal => `${cal.month_name} (${cal.start_day} to ${cal.end_day})`)
          .join(', ')

        return res.status(400).json({
          success: false,
          message: `Date range conflicts with existing months: ${conflictDetails}`
        })
      }

      // Perform the update
      const updatedCalendar = await CustomCalendarModel.findByIdAndUpdate(id, updateData, {
        new: true, // Return updated document
        runValidators: true // Run mongoose validation
      })

      if (!updatedCalendar) {
        return res.status(404).json({
          success: false,
          message: 'Calendar entry not found'
        })
      }

      return res.send({
        message: 'Custom calendar updated successfully',
        payload: {
          updatedCalendar
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a POST request')
  }
}

export default connectDb(guardWrapper(handler))
