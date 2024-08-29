import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { getAllTicketsForEmployee } from 'src/backend/utils/business-tickets/getAllTicketsForEmployee'
import { getAllTicketsForSalesEmployee } from 'src/backend/utils/business-tickets/getAllTicketsForSalesEmployee'
import { getAllTicketsTeamLead } from 'src/backend/utils/business-tickets/getAllTicketsForTeamLead'
import { getAllTicketsForAdmin } from 'src/backend/utils/business-tickets/getAllTicketsForAdmin'
import { getAllTicketsForSalesManager } from 'src/backend/utils/business-tickets/getAllTicketsForSalesManager'
import createLog from 'src/backend/utils/createLog';
import BusinessModel from 'src/backend/schemas/business.schema';

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {

      const user = req.user
      const clientIP = req.clientIP
      const businessId = req.query.businessId

      switch (req.user.role) {
        case UserRole.EMPLOYEE:
          return getAllTicketsForEmployee(req, res)

        case UserRole.SALE_EMPLOYEE:
          return getAllTicketsForSalesEmployee(req, res)

        case UserRole.TEAM_LEAD:
          return getAllTicketsTeamLead(req, res)

        case UserRole.ADMIN:
          return getAllTicketsForAdmin(req, res)

        case UserRole.SALE_MANAGER:
          return getAllTicketsForSalesManager(req, res)

        default:

          const business = await BusinessModel.findById(businessId)

          //create logs
          const logMsg = `${clientIP} : ${user.user_name} from department ${user.department_name} fetched all business tickets of business: ${business.business_name}`
          createLog({ msg: logMsg })

          break
      }
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
