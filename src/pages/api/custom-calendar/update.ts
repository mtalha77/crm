import { guardWrapper } from 'src/backend/auth.guard';
import connectDb from 'src/backend/DatabaseConnection';
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema';

/**
 * Handler for updating a specific month in the custom calendar.
 */
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { year, month_number, start_day, end_day } = req.body;

    try {
      // Fetch the calendar for the specified year
      const calendar = await CustomCalendarModel.findOne({ year });

      // If no calendar is found, return a 404 error
      if (!calendar) {
        return res.status(404).json({ message: 'Calendar not found for the specified year' });
      }

      // Find the specific month by its number
      const month = calendar.months.find(m => m.month_number === month_number);

      // If the month is not found, return a 404 error
      if (!month) {
        return res.status(404).json({ message: `Month ${month_number} not found in the calendar` });
      }

      // Update the start and end dates for the month
      month.start_day = start_day;
      month.end_day = end_day;

      // Save the updated calendar to the database
      await calendar.save();

      // Respond with the updated calendar
      return res.status(200).json({
        message: 'Month updated successfully',
        payload: { calendar },
      });
    } catch (error) {
      console.error('Error updating calendar month:', error);
      res.status(500).send('Something went wrong');
    }
  } else {
    // Reject non-POST requests
    res.status(405).send('This is a POST request');
  }
};

// Export the handler wrapped with database connection and authentication guard
export default connectDb(guardWrapper(handler));
