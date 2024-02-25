// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      subject: 'home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'Create Ticket',
      icon: 'mdi-ticket-confirmation-outline',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/ticket-create/localSeo' },
        { title: 'Wordpress Development', path: '/ticket-create/wordPress' },
        { title: 'Website SEO', path: '/ticket-create/webSeo' },
        { title: 'Paid Marketing', path: '/ticket-create/paidMarketing' },
        { title: 'Social Media / Customer Reviews Management', path: '/ticket-create/socialMedia' }
      ]
    },
    {
      title: 'Users',
      icon: 'mdi:shield-outline',
      children: [
        { title: 'Create New User', path: '/users/create-user' },
        { title: 'View Users', path: '/users/view-users' }
      ]
    },
    {
      path: '/view-tickets',
      title: 'View Tickets',
      icon: 'mdi:shield-outline'
    },
    {
      path: '/view-businesses',
      title: 'View Businesses',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation
