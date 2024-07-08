import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { Department } from 'src/shared/enums/Department.enum'

const TeamLeadNavigation = () => {
  const { user } = useAuth()

  const navItems: VerticalNavItemsType = [
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
      children: [{ title: 'Business', path: '/view-tickets' }]
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

  // Check if user is a Team Lead and belongs to Wordpress department, and add the Forms View item
  if (user?.role === UserRole.TEAM_LEAD && user?.department_name === Department.WordPress) {
    navItems.push({
      title: 'Forms View',
      subject: 'form',
      icon: 'formkit:filedoc',
      children: [
        { title: 'Domain Form', path: '/forms-view/domain-form' },
        { title: 'Hosting Form', path: '/forms-view/hosting-form' }
      ]
    })
  }

  return navItems
}

export default TeamLeadNavigation
