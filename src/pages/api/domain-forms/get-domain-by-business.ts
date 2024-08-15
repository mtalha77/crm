import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { businessId } = req.query

      if (!businessId) {
        return res.status(400).send('Business ID is required')
      }

      const domainForms = await DomainFormModel.find({ business: businessId })

      if (!domainForms || domainForms.length === 0) {
        return res.status(404).send('No domain forms found for this business')
      }

      return res.send({
        message: 'Domain forms fetched successfully',
        payload: { domainForms }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Network error')
    }
  } else {
    res.status(500).send('This is a GET request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
