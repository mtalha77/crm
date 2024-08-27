import connectDb from 'src/backend/DatabaseConnection'
import IpModel from 'src/backend/schemas/ip.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { id, newIp } = req.body

      if (!id || !newIp) return res.status(500).send('Missing required fields')

      const isIpUpdated = await IpModel.findByIdAndUpdate(id, {ip: newIp})
      if (!isIpUpdated) return res.status(500).send('Error updating IP address')

      return res.send({
        message: 'Ip updated successfully',
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
