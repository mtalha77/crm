import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const business = await BusinessModel.findById(id)

      if (!business) {
        return res.status(404).send('business not found')
      }

      return res.send({
        message: 'business fetched successfully',
        payload: { business }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('Network error')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
