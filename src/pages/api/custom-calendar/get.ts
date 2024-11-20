import connectDb from 'src/backend/DatabaseConnection'
import CustomCalendarModel from 'src/backend/schemas/customCalendar.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const calendar = await CustomCalendarModel.find().sort({ month_number: 1 })

      return res.send({
        message: 'custom calendar successfully',
        payload: {
          calendar
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a GET request')
  }
}

export default connectDb(guardWrapper(handler))
