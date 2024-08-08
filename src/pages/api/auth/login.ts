import connectDb from 'src/backend/DatabaseConnection'
import UserModel from '../../../backend/schemas/user.schema'
import jwt, { Secret } from 'jsonwebtoken'
import DepartmentModel from 'src/backend/schemas/department.schema'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import BusinessModel from 'src/backend/schemas/business.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { NextApiRequest, NextApiResponse } from 'next'

const tokenSecret = process.env.JWT_SECRET as Secret

// List of allowed IP addresses
const allowedIPs = ['122.129.69.89', '202.163.76.177', '127.0.0.1', '::1'] // Replace with your allowed IPs

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Check IP address
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('clientIP: ', clientIP)

    if (!allowedIPs.includes(clientIP as string)) {
      return res.status(403).json({ message: 'Forbidden: Your IP is not allowed.' })
    }

    try {
      const { user_name, password } = req.body

      UserModel.schema
      DepartmentModel.schema
      BusinessModel.schema
      BusinessTicketModel.schema
      DepartTicketModel.schema
      PaymentSessionModel.schema
      PaymentHistoryModel.schema

      const user = await UserModel.findOne({ user_name })
      if (!user) return res.status(500).send('Invalid username')
      if (password !== user.password) return res.status(500).send('Invalid password')

      const token = jwt.sign({ user }, tokenSecret)

      const departments = await DepartmentModel.find({})

      if (!departments) throw new Error('no departments')

      return res.send({
        message: 'login successful',
        payload: { user, token, departments }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
