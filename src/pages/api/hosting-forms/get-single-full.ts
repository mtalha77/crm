import connectDb from 'src/backend/DatabaseConnection'
import { HostingFormModel } from 'src/backend/schemas/hostingform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { _id } = req.query

      if (!_id) {
        return res.status(400).send('Hosting form ID is required')
      }

      const hostingForm = await HostingFormModel.findById(_id).populate('business', 'business_name')
      if (!hostingForm) {
        return res.status(404).send('Hosting form not found')
      }

      return res.send({
        message: 'Hosting form fetched successfully',
        payload: { hostingForm }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(500).send('This is a GET request')
  }
}

export default connectDb(handler)
