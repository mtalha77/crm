import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { getAllTicketsForEmployee } from 'src/backend/utils/business-tickets/getAllTicketsForEmployee'
import { getAllTicketsForSalesEmployee } from 'src/backend/utils/business-tickets/getAllTicketsForSalesEmployee'
import { getAllTicketsTeamLead } from 'src/backend/utils/business-tickets/getAllTicketsForTeamLead'
import { getAllTicketsForAdmin } from 'src/backend/utils/business-tickets/getAllTicketsForAdmin'

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      switch (req.user.role) {
        case UserRole.EMPLOYEE:
          return getAllTicketsForEmployee(req, res)

        case UserRole.SALE_EMPLOYEE:
          return getAllTicketsForSalesEmployee(req, res)

        case UserRole.TEAM_LEAD:
          return getAllTicketsTeamLead(req, res)

        case UserRole.ADMIN:
          return getAllTicketsForAdmin(req, res)

        default:
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
