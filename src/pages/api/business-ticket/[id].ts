import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      const ticket = await BusinessTicketModel.findById(id).populate('business_id')

      if (!ticket) {
        return res.status(404).send('ticket not found')
      }

      return res.send({
        message: 'ticket fetched successfully',
        payload: { ticket }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
