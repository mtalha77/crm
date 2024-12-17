export const homeRouteObj = {
  title: 'Home',
  path: '/home',
  action: 'read',
  subject: 'home',
  icon: 'mdi:home-outline'
}

export const ipRouteObj = {
  title: 'IP Access',
  icon: 'mdi:monitor-lock',
  subject: 'IP-routes',
  children: [
    { title: 'Allowed IPs', path: '/ip/allowedIps' },
    { title: 'Global Access Users', path: '/ip/globalAccessUsers' }
  ]
}

export const viewTicketsRouteObj = {
  path: '/view-tickets',
  title: 'View Tickets',
  icon: 'mdi:shield-outline',
  subject: 'view-business-tickets'
}

export const viewBusinessesRouteObj = {
  path: '/view-businesses',
  title: 'View Businesses',
  icon: 'mdi:shield-outline',
  subject: 'view-businesses'
}

export const viewDepartmentalTicketsRouteObj = {
  path: '/view-d-tickets',
  title: 'View Dep. Tickets',
  icon: 'mdi:shield-outline',
  subject: 'view-departmental-tickets'
}

export const createTicketsRouteObj = {
  title: 'Create Ticket',
  icon: 'mdi-ticket-confirmation-outline',
  subject: 'create-business-ticket',
  children: [
    { title: 'Custom Development', path: '/ticket-create/customDevelopment' },
    { title: 'Local SEO / GMB Optimization', path: '/ticket-create/localSeo' },
    { title: 'Website Development', path: '/ticket-create/wordPress' },
    { title: 'Website SEO', path: '/ticket-create/webSeo' },
    { title: 'Paid Marketing', path: '/ticket-create/paidMarketing' },
    { title: 'Social Media / Customer Reviews Management', path: '/ticket-create/socialMedia' },
    { title: 'Writer', path: '/ticket-create/writer' },
    { title: 'Designer', path: '/ticket-create/designer' }
  ]
}

export const createDepartmentalTicketsRouteObj = {
  title: 'Create Dep. Ticket',
  subject: 'create-departmental-ticket',
  icon: 'mdi-ticket-confirmation-outline',
  children: [
    { title: 'Local SEO / GMB Optimization', path: '/D-ticket-create/dLocalSeo' },
    { title: 'Wordpress Development', path: '/D-ticket-create/dWordPress' },
    { title: 'Website SEO', path: '/D-ticket-create/dWebSeo' },
    { title: 'Paid Marketing', path: '/D-ticket-create/dPaidMarketing' },
    { title: 'Social Media / Customer Reviews Management', path: '/D-ticket-create/dSocialMedia' },
    { title: 'Writer', path: '/D-ticket-create/dWriter' },
    { title: 'Designer', path: '/D-ticket-create/dDesigner' }
  ]
}

export const accountsRouteObj = {
  title: 'Accounts',
  subject: 'accounts',
  icon: 'mdi-ticket-confirmation-outline',
  children: [
    { path: '/accounts/fronter-sheet', title: 'Fronter Sheet' },
    {
      path: '/accounts/closer-sheet',
      title: 'Closer Sheet'
    },
    {
      path: '/accounts/remaining-sheet',
      title: 'Remaining Sheet'
    }
  ]
}

export const analyticsRouteObj = {
  title: 'Analytics',
  subject: 'analytics',
  icon: 'carbon:analytics',
  children: [
    { path: '/analytics/overall-sales', title: 'OverAll Sales' },
    {
      path: '/analytics/fronter-sales',
      title: 'Fronter Sales'
    },
    {
      path: '/analytics/closer-sales',
      title: 'Closer Sales'
    },
    {
      path: '/analytics/business-tickets',
      title: 'Business Tickets'
    },
    {
      path: '/analytics/businesses-analytics',
      title: 'Businesses'
    },
    {
      path: '/analytics/services-analytics',
      title: 'Services'
    }
  ]
}

export const CommissionsRouteObj = {
  title: 'Commissions',
  subject: 'commissions',
  icon: 'mdi:shield-outline',
  children: [
    { title: 'Fronters', path: '/commissions/fronterCommission' },
    { title: 'Closers', path: '/commissions/closerCommission' }
  ]
}

export const UsersRouteObj = {
  title: 'Users',
  subject: 'users',
  icon: 'mdi:shield-outline',
  children: [
    { title: 'Create New User', path: '/users/create-user' },
    { title: 'View Users', path: '/users/view-users' }
  ]
}

export const domainFormViewsObj = {
  title: 'Forms View',
  subject: 'form',
  icon: 'formkit:filedoc',
  children: [
    { title: 'Domain Form', path: '/forms-view/domain-form' },
    { title: 'Hosting Form', path: '/forms-view/hosting-form' }
  ]
}

export const logsObj = {
  title: 'Logs',
  subject: 'logs',
  icon: 'formkit:filedoc',
  children: [{ title: 'Logs', path: '/view-logs' }]
}

export const templatesRouteObj = {
  title: 'Templates',
  subject: 'templates',
  icon: 'mdi:file-document-outline',
  children: [
    { title: 'Newsletter Template', path: '/templates/newsletter' },
    { title: 'Promotional Template', path: '/templates/promotional' },
    { title: 'Post-Christmas Template', path: '/templates/postChristmas' }
  ]
}
