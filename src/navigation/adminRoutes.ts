// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      subject: 'home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Create Ticket',
      icon: 'mdi-ticket-confirmation-outline',
      subject: 'create-business-ticket',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/ticket-create/localSeo' },
        { title: 'Wordpress Development', path: '/ticket-create/wordPress' },
        { title: 'Website SEO', path: '/ticket-create/webSeo' },
        { title: 'Paid Marketing', path: '/ticket-create/paidMarketing' },
        { title: 'Social Media / Customer Reviews Management', path: '/ticket-create/socialMedia' }
      ]
    },

    {
      path: '/view-tickets',
      title: 'View Tickets',
      icon: 'mdi:shield-outline',
      subject: 'view-business-tickets'
    },

    {
      title: 'Create Dep. Ticket',
      subject: 'create-departmental-ticket',
      icon: 'mdi-ticket-confirmation-outline',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/D-ticket-create/dLocalSeo' },
        { title: 'Wordpress Development', path: '/D-ticket-create/dWordPress' },
        { title: 'Website SEO', path: '/D-ticket-create/dWebSeo' },
        { title: 'Paid Marketing', path: '/D-ticket-create/dPaidMarketing' },
        { title: 'Social Media / Customer Reviews Management', path: '/D-ticket-create/dSocialMedia' },
        { title: 'Writers', path: '/D-ticket-create/dWriter' }
      ]
    },
    {
      path: '/view-d-tickets',
      title: 'View Dep. Tickets',
      icon: 'mdi:shield-outline',
      subject: 'view-departmental-tickets'
    },
    {
      title: 'Users',
      subject: 'users',
      icon: 'mdi:shield-outline',
      children: [
        { title: 'Create New User', path: '/users/create-user' },
        { title: 'View Users', path: '/users/view-users' }
      ]
    },
    {
      path: '/view-businesses',
      title: 'View Businesses',
      icon: 'mdi:shield-outline',
      subject: 'view-businesses'
    },
    {
      path: '/fronter-sheet',
      title: 'Fronter Sheet',
      icon: 'mdi:shield-outline'
    },
    {
      path: '/closer-sheet',
      title: 'Closer Sheet',
      icon: 'mdi:shield-outline'
    },
    {
      path: '/view-payment-history',
      title: 'payment',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default adminNavigation
