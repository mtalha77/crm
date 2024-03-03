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
      gmb_url: data.business_id.gmb_url
    }
  }
}
