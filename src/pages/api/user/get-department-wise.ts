import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import UserModel from 'src/backend/schemas/user.schema'
import { Department } from 'src/shared/enums/Department.enum'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await UserModel.find({ department_name: req.user.department_name }, '-password')

      return res.send({
        message: 'users fetched successfully',
        payload: { users }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
