// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const saleEmployeeNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      subject: 'home',
      icon: 'mdi:home-outline'
    },

    {
      path: '/view-tickets',
      title: 'View Tickets',
      icon: 'mdi:shield-outline',
      subject: 'view-business-tickets'
    }
  ]
}

export default saleEmployeeNavigation
