// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  UsersRouteObj,
  accountsRouteObj,
  analyticsRouteObj,
  createDepartmentalTicketsRouteObj,
  createTicketsRouteObj,
  homeRouteObj,
  viewBusinessesRouteObj,
  viewDepartmentalTicketsRouteObj,
  viewTicketsRouteObj,
  domainFormViewsObj,
  ipRouteObj,
  logsObj,
  emailObj
} from './routes'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    homeRouteObj,
    ipRouteObj,
    createTicketsRouteObj,
    viewTicketsRouteObj,
    createDepartmentalTicketsRouteObj,
    viewDepartmentalTicketsRouteObj,
    UsersRouteObj,
    viewBusinessesRouteObj,
    accountsRouteObj,
    analyticsRouteObj,
    domainFormViewsObj,
    logsObj,
    emailObj

    // CommissionsRouteObj
  ]
}

export default adminNavigation
