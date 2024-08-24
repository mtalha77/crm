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
import createLog from 'src/backend/utils/createLog'

const tokenSecret = process.env.JWT_SECRET as Secret

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
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

      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} has logged In`

      createLog({ msg: logMsg })

      return res.send({
        message: 'login successful',
        payload: { user, token, departments }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
