import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import createLog from 'src/backend/utils/createLog'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const user = req.user
      const clientIP = req.clientIP

      if (
        !(
          req.user.role === UserRole.ADMIN ||
          req.user.role === UserRole.SALE_MANAGER ||
          req.user.role === UserRole.TEAM_LEAD
        )
      )
        return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')
      const { id, status } = req.body
      if (!id || !status) return res.status(400).send('Fields Missing')

      const result = await BusinessModel.findByIdAndUpdate(id, {
        $set: {
          status: status
        }
      })

      if (!result) return res.status(500).send('Not able to update ticket.Please try again')

      //create logs
      const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} is attempting to update business status of ${result.business_name}`
      createLog({ msg: logMsg })

      return res.send({
        message: `Business Status Changes to ${status}`,
        payload: {}
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Network Error')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
