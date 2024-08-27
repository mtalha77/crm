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
  ipRouteObj
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
    domainFormViewsObj

    // CommissionsRouteObj
  ]
}

export default adminNavigation
