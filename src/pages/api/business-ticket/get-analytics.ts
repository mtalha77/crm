import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const analytics = await BusinessTicketModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            statusCounts: {
              $push: {
                k: '$_id',
                v: '$count'
              }
            }
          }
        },
        {
          $replaceRoot: {
            newRoot: { $arrayToObject: '$statusCounts' }
          }
        }
      ])

      if (!analytics) {
        return res.status(404).send('Network Error')
      }

      return res.send({
        message: 'ticket analytics fetched successfully',
        payload: { analytics }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
