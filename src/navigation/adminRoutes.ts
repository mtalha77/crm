// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  DomainFormObj,
  UsersRouteObj,
  accountsRouteObj,
  analyticsRouteObj,
  createDepartmentalTicketsRouteObj,
  createTicketsRouteObj,
  homeRouteObj,
  viewBusinessesRouteObj,
  viewDepartmentalTicketsRouteObj,
  viewTicketsRouteObj
} from './routes'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    homeRouteObj,
    createTicketsRouteObj,
    viewTicketsRouteObj,
    createDepartmentalTicketsRouteObj,
    viewDepartmentalTicketsRouteObj,
    UsersRouteObj,
    viewBusinessesRouteObj,
    accountsRouteObj,
    analyticsRouteObj,
    DomainFormObj

    // CommissionsRouteObj
  ]
}

export default adminNavigation
