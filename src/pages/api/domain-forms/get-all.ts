import connectDb from 'src/backend/DatabaseConnection'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const domainForms = await DomainFormModel.find({})

      return res.send({
        message: 'Domain forms fetched successfully',
        payload: { domainForms }
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
