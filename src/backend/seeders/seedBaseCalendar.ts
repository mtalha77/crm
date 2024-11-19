import BaseCalendarModel from '../schemas/baseCalendar.schema'

export const seedBaseCalendar = async () => {
  const baseCalendar = [
    { month_number: 1, month_name: 'Jan', start_day: '01-01', end_day: '02-18' },
    { month_number: 2, month_name: 'Feb', start_day: '02-21', end_day: '03-10' },
    { month_number: 3, month_name: 'Mar', start_day: '03-11', end_day: '04-15' },
    { month_number: 4, month_name: 'Apr', start_day: '04-16', end_day: '05-20' },
    { month_number: 5, month_name: 'May', start_day: '05-21', end_day: '06-25' },
    { month_number: 6, month_name: 'Jun', start_day: '06-26', end_day: '07-30' },
    { month_number: 7, month_name: 'Jul', start_day: '08-01', end_day: '08-31' },
    { month_number: 8, month_name: 'Aug', start_day: '09-01', end_day: '09-25' },
    { month_number: 9, month_name: 'Sep', start_day: '09-26', end_day: '10-15' },
    { month_number: 10, month_name: 'Oct', start_day: '10-16', end_day: '11-20' },
    { month_number: 11, month_name: 'Nov', start_day: '11-21', end_day: '12-10' },
    { month_number: 12, month_name: 'Dec', start_day: '12-11', end_day: '12-31' }
  ]

  // Insert data if not already seeded
  const existingCalendar = await BaseCalendarModel.find({})
  if (existingCalendar.length === 0) {
    await BaseCalendarModel.insertMany(baseCalendar)
    console.log('BaseCalendar seeded successfully!')
  } else {
    console.log('BaseCalendar already exists!')
  }

}
