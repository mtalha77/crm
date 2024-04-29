import { DWebSeoFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDWebSeo = (data: any): DWebSeoFormType => {
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
    },
    business: {
      business_name: data.business_id.business_name,
      business_email: data.business_id.business_email,
      business_number: data.business_id.business_number,
      business_hours: data.business_id.business_hours,
      state: data.business_id.state,
      country: data.business_id.country,
      zip_code: data.business_id.zip_code,
      street: data.business_id.street,
      website_url: data.business_id.website_url,
      social_profile: data.business_id.social_profile,
      gmb_url: data.business_id.gmb_url,
      client_name: data.business_id.client_name
    }
  }
}
