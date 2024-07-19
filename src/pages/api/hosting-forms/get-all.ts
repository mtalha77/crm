import connectDb from 'src/backend/DatabaseConnection'
import { HostingFormModel } from 'src/backend/schemas/hostingform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const hostingForms = await HostingFormModel.find({})

      return res.send({
        message: 'Hosting forms fetched successfully',
        payload: { hostingForms }
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
