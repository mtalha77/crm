// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  UsersRouteObj,
  createDepartmentalTicketsRouteObj,
  createTicketsRouteObj,
  homeRouteObj,
  viewBusinessesRouteObj,
  viewCloserSheetRouteObj,
  viewDepartmentalTicketsRouteObj,
  viewFronterSheetRouteObj,
  viewRemainingSheetRouteObj,
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
    viewFronterSheetRouteObj,
    viewCloserSheetRouteObj,
    viewRemainingSheetRouteObj
  ]
}

export default adminNavigation
