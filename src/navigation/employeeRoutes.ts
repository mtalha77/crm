// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const employeeNavigation = (): VerticalNavItemsType => {
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

    // {
    //   path: '/view-d-tickets',
    //   title: 'View D Tickets',
    //   icon: 'mdi:shield-outline',
    //   subject: 'view-departmental-tickets'
    // }
  ]
}

export default employeeNavigation
