import { DSocialMediaFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDSocialMedia = (data: any): DSocialMediaFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    socialMediaFormTypeDetails: {
      service_name: data?.service_name,
      facebook_url: data?.facebook_url,
      login_credentials: data?.login_credentials,
      notes: data?.notes,
      work_status: data?.work_status,
      platform_name: data?.platform_name,
      no_of_likes: data?.no_of_likes,
      no_of_gmb_reviews: data?.no_of_gmb_reviews,
      no_of_posts: data?.no_of_posts
    }
  }
}
