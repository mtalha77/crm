import connectDb from 'src/backend/DatabaseConnection'
import IpModel from 'src/backend/schemas/ip.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const allAllowedIpList = await IpModel.find({}).sort({ createdAt: -1 })

      if (!allAllowedIpList) return res.status(500).send('Not able to get IP list')

      return res.send({
        message: 'IP list fetched successfully',
        payload: { allowedIPs: allAllowedIpList }
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
