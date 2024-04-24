import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import UserModel from 'src/backend/schemas/user.schema'
import DepartmentModel from 'src/backend/schemas/department.schema'
import mongoose from 'mongoose'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { user_name, password, role, department_name, user_id } = req.body

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(500).send('You are not authorized to perform this action')

      const userExists = await UserModel.findOne({ user_name, _id: { $ne: new mongoose.Types.ObjectId(user_id) } })

      if (userExists) return res.status(500).send('User with that username already exists')

      const department = await DepartmentModel.findOne({ name: department_name })

      if (!department) return res.status(500).send('Error Occured')

      const temp: any = {
        user_name,
        password,
        role,
        department_id: department._id,
        department_name
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(user_id) },
        {
          $set: temp
        },
        { new: true }
      )

      if (!updatedUser) return res.status(500).send('Not able to update new user. Please try again')

      return res.send({
        message: 'User Updated Successfully',
        payload: { user: updatedUser }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
