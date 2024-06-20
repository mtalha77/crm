import connectDb from 'src/backend/DatabaseConnection'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { _id } = req.query

      if (!_id) {
        return res.status(400).send('Domain form ID is required')
      }

      const domainForm = await DomainFormModel.findById(_id)
      if (!domainForm) {
        return res.status(404).send('Domain form not found')
      }

      return res.send({
        message: 'Domain form fetched successfully',
        payload: { domainForm }
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
