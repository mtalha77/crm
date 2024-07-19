// api/domain-forms/get-expired.ts
import connectDb from 'src/backend/DatabaseConnection'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'
import dayjs from 'dayjs'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const now = dayjs() // Current date and time
      const twoDaysLater = now.add(7, 'days') // Date and time 48 hours (2 days) from now

      // Fetch domain forms that are either expired or expiring within the next 48 hours
      const expiringOrExpiredForms = await DomainFormModel.find({
        expiration_date: {
          $lte: twoDaysLater.toDate()
        }
      })

      return res.send({
        message: 'Domain forms expiring soon or already expired fetched successfully',
        payload: { domainForms: expiringOrExpiredForms }
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
