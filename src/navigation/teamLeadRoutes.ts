// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const teamLeadNavigation = (): VerticalNavItemsType => {
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
    },

    {
      title: 'Create D Ticket',
      subject: 'create-departmental-ticket',
      icon: 'mdi-ticket-confirmation-outline',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/D-ticket-create/dLocalSeo' },
        { title: 'Wordpress Development', path: '/D-ticket-create/dWordPress' },
        { title: 'Website SEO', path: '/D-ticket-create/dWebSeo' },
        { title: 'Paid Marketing', path: '/D-ticket-create/dPaidMarketing' },
        { title: 'Social Media / Customer Reviews Management', path: '/D-ticket-create/dSocialMedia' }
      ]
    },
    {
      path: '/view-d-tickets',
      title: 'View D Tickets',
      icon: 'mdi:shield-outline',
      subject: 'view-departmental-tickets'
    }
  ]
}

export default teamLeadNavigation
