import { Department } from './shared/enums/Department.enum'

export const mapFormPageRoutes = {
  [Department.LocalSeo]: '/ticket-update/localSeo',
  [Department.WordPress]: '/ticket-update/wordPress',
  [Department.WebSeo]: '/ticket-update/webSeo',
  [Department.PaidMarketing]: '/ticket-update/paidMarketing',
  [Department.SocialMedia]: '/ticket-update/socialMedia',
  [Department.Admin]: '/',
  [Department.Writer]: '/ticket-update/writer',
  [Department.Sales]: '/',
  [Department.Designer]: '/ticket-update/designer'
}

export const mapDFormPageRoutes = {
  [Department.LocalSeo]: '/ticket-d-update/localSeo',
  [Department.WordPress]: '/ticket-d-update/wordPress',
  [Department.WebSeo]: '/ticket-d-update/webSeo',
  [Department.PaidMarketing]: '/ticket-d-update/paidMarketing',
  [Department.SocialMedia]: '/ticket-d-update/socialMedia',
  [Department.Admin]: '/',
  [Department.Writer]: '/ticket-d-update/writer',
  [Department.Designer]: '/ticket-d-update/designer',
  [Department.Sales]: '/'
}
