import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import NotificationModel from 'src/backend/schemas/notification.schema'
import { NotificationType } from 'src/shared/enums/NotificationType.enum'
import DepartmentModel from 'src/backend/schemas/department.schema'
import { Department } from 'src/shared/enums/Department.enum'

dayjs.extend(utc)
dayjs.extend(timezone)

export default async function handler(req, res) {
  try {
    // Define the Pakistan Standard Time zone
    const pakistanTimeZone = 'Asia/Karachi'

    // Get the current date in Pakistan Standard Time (PST)
    const now = dayjs().tz(pakistanTimeZone)

    // Set the start and end of the day in Pakistan Standard Time
    const startOfDay = now.startOf('day')
    const endOfDay = now.endOf('day')

    // Convert to UTC for MongoDB query
    const startOfDayUTC = startOfDay.toDate()
    const endOfDayUTC = endOfDay.toDate()

    // Query for tickets with client_reporting_date within the range
    const tickets1 = await BusinessTicketModel.find({
      client_reporting_date: {
        $gte: startOfDayUTC,
        $lt: endOfDayUTC
      }
    }).populate('business_id', 'business_name')

    // Query for tickets with remaining_price_date today

    const tickets2 = await BusinessTicketModel.find({
      remaining_price_date: {
        $gte: startOfDayUTC,
        $lt: endOfDayUTC
      }
    }).populate('business_id', 'business_name')

    // console.log(tickets)

    const departments = await DepartmentModel.find({})

    if (!departments) throw new Error('No departments found')

    const saleDepartment = departments.find(d => d.name === Department.Sales)
    const adminDepartment = departments.find(d => d.name === Department.Admin)

    const notifications1 = tickets1.map(t => {
      return {
        message: `${t.business_id.business_name} due date reached`,
        ticket_id: t._id,
        category: 'Business',
        type: NotificationType.CLIENT_REPORTING_DATE,
        for_department_ids: [saleDepartment._id, t.assignee_depart_id, adminDepartment._id]
      }
    })

    const notifications2 = tickets2.map(t => {
      return {
        message: `${t.business_id.business_name} remaining price date reached`,
        ticket_id: t._id,
        category: 'Business',
        type: NotificationType.REMAINING_PRICE_DATE,
        for_department_ids: [saleDepartment._id, adminDepartment._id]
      }
    })

    // Calculate the date 7 days ago
    const sevenDaysAgo = now.subtract(7, 'day')

    // Set the start and end of the day 7 days ago
    const startOfD = sevenDaysAgo.startOf('day')
    const endOfD = sevenDaysAgo.endOf('day')

    // Convert to UTC for MongoDB query
    const startOfDUTC = startOfD.toDate()
    const endOfDUTC = endOfD.toDate()

    // Query for tickets with client_reporting_date exactly 7 days old
    const tickets3 = await BusinessTicketModel.find({
      client_reporting_date: {
        $gte: startOfDUTC,
        $lt: endOfDUTC
      }
    }).populate('business_id', 'business_name')

    const notifications3 = tickets3.map(t => {
      return {
        message: `Client reporting ${t.business_id.business_name} ticket due on ${sevenDaysAgo.format(
          'DD-MM-YYYY'
        )} is overdue by 7 days as of ${now.format(
          'DD-MM-YYYY'
        )} and didn't recur. Please create new ticket for this service.`,
        ticket_id: t._id,
        category: 'Business',
        type: NotificationType.CLIENT_REPORTING_DATE_7_DAYS_PASSED,
        for_department_ids: [saleDepartment._id, adminDepartment._id]
      }
    })

    const notifications = [...notifications1, ...notifications2, ...notifications3]

    const result4 = await NotificationModel.insertMany(notifications)

    if (!result4) throw new Error('Not able to create ticket. Please try again')

    res.status(200).json({
      message: 'Client reporting dates',
      tickets1,
      message2: 'remaining date',
      tickets2,
      message3: '7 days ago',
      tickets3
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error: ' + error)
  }
}
