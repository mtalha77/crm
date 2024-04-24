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

    // comment for shabi
    // {
    //   title: 'Create Ticket',
    //   subject: 'create-departmental-ticket',
    //   icon: 'mdi-ticket-confirmation-outline',
    //   children: [
    //     { title: 'Local SEO / GMB Optimization', path: '/D-ticket-create/dLocalSeo' },
    //     { title: 'Wordpress Development', path: '/D-ticket-create/dWordPress' },
    //     { title: 'Website SEO', path: '/D-ticket-create/dWebSeo' },
    //     { title: 'Paid Marketing', path: '/D-ticket-create/dPaidMarketing' },
    //     { title: 'Social Media / Customer Reviews Management', path: '/D-ticket-create/dSocialMedia' }
    //   ]
    // },

    {
      title: 'View Tickets',
      icon: 'mdi-ticket-confirmation-outline',
      subject: 'create-business-ticket',
      children: [
        { title: 'Business', path: '/view-tickets' }

        // comment for shabi
        // { title: 'Departmental', path: '/view-d-tickets' }
      ]
    },
    {
      path: '/view-businesses',
      title: 'View Businesses',
      icon: 'mdi:shield-outline',
      subject: 'view-businesses'
    },
    {
      title: 'Analytics',
      subject: 'analytics',
      icon: 'carbon:analytics',
      children: [
        {
          path: '/analytics/business-tickets',
          title: 'Business Tickets'
        }

        // comment for shabi
        // {
        //   path: '/analytics/departmental-tickets',
        //   title: 'Departmental Tickets'
        // }
      ]
    }
  ]
}

export default teamLeadNavigation
