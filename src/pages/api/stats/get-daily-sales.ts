import connectDb from 'src/backend/DatabaseConnection';
import { guardWrapper } from 'src/backend/auth.guard';
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema';
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema';
import { PaymentType } from 'src/shared/enums/PaymentType.enum';
import mongoose from 'mongoose';

async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { year, month, user_name } = req.query;

    if (!year || isNaN(Number(year)) || !month || isNaN(Number(month))) {
      return res.status(400).json({ message: 'Invalid year or month provided' });
    }

    // Fetch the calendar for the specified year
    const customCalendar = await CustomCalendarModel.findOne({ year: parseInt(year as string) });

    if (!customCalendar) {
      return res.status(404).json({ message: `Custom calendar not found for year ${year}` });
    }

    // Find the month within the calendar's months array
    const monthData = customCalendar.months.find(
      (m) => m.month_number === parseInt(month as string)
    );

    if (!monthData) {
      return res.status(404).json({ message: `Month ${month} not found in the calendar for year ${year}` });
    }

    // Extract start and end dates
    const start_date = `${year}-${monthData.start_day}`;
    const end_date = `${year}-${monthData.end_day}`;

    // Build match conditions
    const matchConditions: any[] = [
      { payment_type: PaymentType.Credit },
      {
        createdAt: {
          $gte: new Date(start_date),
          $lte: new Date(end_date),
        },
      },
    ];

    // Add user filter if specified
    if (user_name && user_name !== 'undefined') {
      matchConditions.push({
        $or: [
          { fronter_id: new mongoose.Types.ObjectId(user_name as string) },
          { closer_id: new mongoose.Types.ObjectId(user_name as string) },
        ],
      });
    }

    // Aggregate daily sales
    const stats = await PaymentHistoryModel.aggregate([
      {
        $match: { $and: matchConditions },
      },
      {
        $project: {
          dayOfMonth: { $dayOfMonth: '$createdAt' },
          full_date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          received_payment: 1,
        },
      },
      {
        $group: {
          _id: '$full_date',
          total_sales: { $sum: '$received_payment' },
          full_date: { $first: '$full_date' },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dayOfMonth: {
              $dateFromString: {
                dateString: '$full_date',
              },
            },
          },
          total_sales: 1,
          full_date: 1,
        },
      },
      {
        $sort: { full_date: 1 },
      },
    ]);

    return res.status(200).json({
      message: 'Daily payment history fetched successfully',
      payload: {
        stats,
        startDay: monthData.start_day,
        endDay: monthData.end_day,
      },
    });
  } catch (error) {
    console.error('Error in daily sales endpoint:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default connectDb(guardWrapper(handler));
