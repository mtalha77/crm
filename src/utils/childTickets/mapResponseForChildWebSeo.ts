import { ChildWebSeoFormType } from 'src/interfaces/childTicketForms.interface'

export const mapResponseForChildWebSeo = (data: any): ChildWebSeoFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    webSeoDetails: {
      notes: data?.notes,
      work_status: data?.work_status,
      service_name: data?.service_name,
      service_location: data?.service_location,
      key_words: data?.key_words,
      login_credentials: data?.login_credentials,
      console_access: data?.console_access,
      analytics_access: data?.analytics_access,
      no_of_backlinks: data?.no_of_backlinks,
      no_of_posts: data?.no_of_posts,
      no_of_blogs: data?.no_of_blogs
    }
  }
}
