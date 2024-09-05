import moment from 'moment'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'

// import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'

// import createLog from 'src/backend/utils/createLog'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { id, clientDate } = req.body

      console.log('id', id)
      console.log('date', clientDate)

      if (!id || !clientDate) {
        return res.status(400).send('Missing required fields') // Changed to 400 Bad Request
      }

      // console.log('date before formatting:', clientDate)
      // const date = new Date(clientDate)
      // console.log('date after formatting:', clientDate)

      // Fetch the payment history and update
      const updatedPaymentHistory = await PaymentHistoryModel.findByIdAndUpdate(id, {
        $set: {
          createdAt: clientDate
        }
      })

      if (!updatedPaymentHistory) {
        return res.status(404).send('Payment history not found') // Changed to 404 Not Found
      }

      return res.send({
        message: 'Payment history updated successfully', // Corrected message
        payload: { updatedPaymentHistory }
      })
    } catch (error) {
      console.error(error) // Improved error logging

      return res.status(500).send('Something went wrong') // Added return
    }
  } else {
    return res.status(405).send('Method Not Allowed') // Changed to 405 Method Not Allowed
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
