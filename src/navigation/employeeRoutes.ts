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
      title: 'View Tickets',
      icon: 'mdi-ticket-confirmation-outline',
      subject: 'create-business-ticket',
      children: [
        { title: 'Business', path: '/view-tickets' },
        { title: 'Departmental', path: '/view-d-tickets' }
      ]
    }
  ]
}

export default employeeNavigation
