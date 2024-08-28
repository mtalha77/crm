import connectDb from 'src/backend/DatabaseConnection'
import UserModel from '../../../backend/schemas/user.schema'
import jwt, { Secret } from 'jsonwebtoken'
import DepartmentModel from 'src/backend/schemas/department.schema'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import BusinessModel from 'src/backend/schemas/business.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { NextApiRequest, NextApiResponse } from 'next/types'


// List of allowed IP addresses
const allowedIPs = ['122.129.69.89', '202.163.76.177', '127.0.0.1', '::1'] // Replace with your allowed IPs

import createLog from 'src/backend/utils/createLog'

const tokenSecret = process.env.JWT_SECRET as Secret

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
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

      if (!user) {
        createLog({ msg: `Unauthorized login attempt with invalid username: ${user_name} from IP: ${clientIP}` })

        return res.status(401).send('Invalid username')
      }

      if (password !== user.password) {
        createLog({
          msg: `Unauthorized login attempt for user: ${user_name} with invalid password from IP: ${clientIP}`
        })

        return res.status(401).send('Invalid password')
      }

      const token = jwt.sign({ user }, tokenSecret)

      const departments = await DepartmentModel.find({})

      if (!departments) throw new Error('no departments')

      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} has logged in`
      createLog({ msg: logMsg })

      return res.send({
        message: 'login successful',
        payload: { user, token, departments }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(405).send('This is a POST request')
  }
}

export default connectDb(handler)
