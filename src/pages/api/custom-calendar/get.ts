import { guardWrapper } from 'src/backend/auth.guard';
import connectDb from 'src/backend/DatabaseConnection';
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema';

/**
 * Handles requests to fetch or populate a custom calendar.
 */
const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { year } = req.query;

    try {
      // Attempt to fetch the calendar for the requested year
      let calendar = await CustomCalendarModel.findOne({ year });

      // If no calendar is found, populate it with default values
      if (!calendar) {
        calendar = await fillCalendarWithDefaultValues(year);
      }

      // Respond with the fetched or newly created calendar
      return res.status(200).json({
        message: 'Calendar fetched successfully',
        payload: { calendar },
      });
    } catch (error) {
      console.error('Error fetching or populating calendar:', error);
      res.status(500).send('Something went wrong');
    }
  } else {
    // Reject non-GET requests
    res.status(405).send('This is a GET request');
  }
};

// Export the handler with middleware for database connection and authentication
export default connectDb(guardWrapper(handler));

/**
 * Populates the calendar with default month data for the specified year.
 * @param {any} year - The year for which to create the calendar.
 * @returns {Promise<any>} - The newly created calendar document.
 */
const fillCalendarWithDefaultValues = async (year: any) => {
  const defaultMonths = [
    { month_number: 1, month_name: 'Jan', start_day: '01-01', end_day: '01-31' },
    { month_number: 2, month_name: 'Feb', start_day: '02-01', end_day: '02-28' },
    { month_number: 3, month_name: 'Mar', start_day: '03-01', end_day: '03-31' },
    { month_number: 4, month_name: 'Apr', start_day: '04-01', end_day: '04-30' },
    { month_number: 5, month_name: 'May', start_day: '05-01', end_day: '05-31' },
    { month_number: 6, month_name: 'Jun', start_day: '06-01', end_day: '06-30' },
    { month_number: 7, month_name: 'Jul', start_day: '07-01', end_day: '07-31' },
    { month_number: 8, month_name: 'Aug', start_day: '08-01', end_day: '08-31' },
    { month_number: 9, month_name: 'Sep', start_day: '09-01', end_day: '09-30' },
    { month_number: 10, month_name: 'Oct', start_day: '10-01', end_day: '10-31' },
    { month_number: 11, month_name: 'Nov', start_day: '11-01', end_day: '11-30' },
    { month_number: 12, month_name: 'Dec', start_day: '12-01', end_day: '12-31' },
  ];

  // Create and save a new calendar document with default month data
  return await CustomCalendarModel.create({
    year,
    months: defaultMonths,
  });
};
