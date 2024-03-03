import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { Department } from 'src/shared/enums/Department.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    let tickets = []
    try {
      switch (req.user.role) {
        case UserRole.EMPLOYEE:
          tickets = await DepartTicketModel.find({ employee_id: req.user._id }).populate('business_id', 'business_name')
          break

        case UserRole.SALE_EMPLOYEE:
          tickets = await DepartTicketModel.find({ assignor_depart_name: Department.Sales }).populate(
            'business_id',
            'business_name'
          )
          break

        case UserRole.TEAM_LEAD:
          tickets = await DepartTicketModel.find({ assignee_depart_id: req.user.department_id }).populate(
            'business_id',
            'business_name'
          )
          break

        case UserRole.ADMIN:
          tickets = await DepartTicketModel.find({}).populate('business_id', 'business_name')
          break

        default:
          break
      }

      return res.send({
        message: 'tickets fetched successfully',
        payload: { tickets }
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
