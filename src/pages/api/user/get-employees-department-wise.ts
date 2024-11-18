import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import UserModel from 'src/backend/schemas/user.schema'
import createLog from 'src/backend/utils/createLog'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { Department } from 'src/shared/enums/Department.enum'

const handler = async (req: any, res: any) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Method Not Allowed. Only GET is supported.' })
  }

  try {
    const { user, clientIP } = req
    const { department_name, user_name } = user

    const filter: any = { department_name }
    if (department_name !== Department.Writer && department_name !== Department.Designer) {
      filter['role'] = UserRole.EMPLOYEE
    }

    const users = await UserModel.find(filter, '-password')

    // Log message creation
    const logMsg = `${clientIP} : ${user_name} from department ${department_name} fetched users detail of its department.`
    createLog({ msg: logMsg })

    return res.status(200).send({
      message: 'Users fetched successfully',
      payload: { users }
    })
  } catch (error) {
    console.error('Error fetching users:', error)

    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

// Apply the guard wrapper to the handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
