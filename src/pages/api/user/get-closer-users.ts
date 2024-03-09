import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'
import UserModel from 'src/backend/schemas/user.schema'
import { Department } from 'src/shared/enums/Department.enum'
import { SaleEmployeeRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const closerUsers = await UserModel.find(
        { department_name: Department.Sales, sub_role: SaleEmployeeRole.CLOSER },
        '-password'
      )

      return res.send({
        message: 'closer users fetched successfully',
        payload: { closerUsers }
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
