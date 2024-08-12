import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartmentModel from 'src/backend/schemas/department.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { departmentId } = req.body

      const department = await DepartmentModel.find({ _id: departmentId })

      return res.send({
        message: 'department info fetched successfully',
        payload: { department }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
