import connectDb from 'src/backend/DatabaseConnection'
import IpModel from 'src/backend/schemas/ip.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { id } = req.body

      if (!id) return res.status(500).send('Missing required fields')

      const isIpDeleted = await IpModel.findByIdAndDelete(id)
      if (!isIpDeleted) return res.status(500).send('Error deleting IP address')

      return res.send({
        message: 'Ip deleted successfully',
        payload: {}
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
