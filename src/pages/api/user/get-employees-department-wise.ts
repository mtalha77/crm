import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import UserModel from 'src/backend/schemas/user.schema'
import createLog from 'src/backend/utils/createLog'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const user = req.user
      const clientIP = req.clientIP

      const users = await UserModel.find(
        { department_name: req.user.department_name, role: UserRole.EMPLOYEE },
        '-password'
      )

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} fetched users detail of its department`
      createLog({ msg: logMsg })

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
