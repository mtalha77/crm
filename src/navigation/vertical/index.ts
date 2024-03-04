// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import adminNavigation from '../adminRoutes'
import employeeNavigation from '../employeeRoutes'
import saleEmployeeNavigation from '../saleEmployeeRoutes'
import teamLeadNavigation from '../teamLeadRoutes'

const navigation = (): VerticalNavItemsType => {
  const userData: any = localStorage.getItem('userData')
  let role = ''
  if (userData) {
    role = JSON.parse(userData).role
  }

  switch (role) {
    case UserRole.ADMIN:
      return adminNavigation()

    case UserRole.SALE_EMPLOYEE:
      return saleEmployeeNavigation()

    case UserRole.EMPLOYEE:
      return employeeNavigation()

    case UserRole.TEAM_LEAD:
      return teamLeadNavigation()

    default:
      return []
  }
}

export default navigation
