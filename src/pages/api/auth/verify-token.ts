import UserModel from 'src/backend/schemas/user.schema'
import connectDb from '../../../backend/DatabaseConnection'
import jwt, { Secret } from 'jsonwebtoken'
import DepartmentModel from 'src/backend/schemas/department.schema'

const tokenSecret = process.env.JWT_SECRET as Secret
const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { token } = req.body
      const decoded: any = jwt.verify(token, tokenSecret)

      const user = await UserModel.findOne({ user_name: decoded.user.user_name }, '-password')
      if (!user) return res.status(500).send('user not found')

      const departments = await DepartmentModel.find({})

      if (!departments) throw new Error('no departments')

      return res.send({
        message: 'token verify successful',
        payload: { user, token, departments }
      })
    } catch (error) {
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
