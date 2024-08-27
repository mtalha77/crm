import connectDb from 'src/backend/DatabaseConnection'
import IpModel from 'src/backend/schemas/ip.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { newIp } = req.body

      if (!newIp) return res.status(500).send('Missing required fields')

      const isIpAlreadyAdded = await IpModel.findOne({ ip: newIp })
      if(isIpAlreadyAdded) return res.status(500).send('IP already exists')

      const newAddedIp = await IpModel.create({
        ip: newIp
      })
      if (!newAddedIp) return res.status(500).send('Not able to add new IP')

      return res.send({
        message: 'Ip added successfully',
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
