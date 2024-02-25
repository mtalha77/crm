import { WordPressFormType } from 'src/interfaces/forms.interface'

export const mapResponseForWordPress = (data: any): WordPressFormType => {
  return {
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
    },
    saleDepart: {
      fronter: data.fronter,
      fronter_id: data.fronter_id,
      closer: data.closer,
      closer_id: data.closer_id,
      sale_type: data.sales_type
    },
    ticketDetails: {
      priority: data.priority,
      due_date: new Date(data.due_date),
      total_payment: 0,
      advance_payment: 0,
      remaining_payment: 0,
      client_reporting_date: data.client_reporting_date ? new Date(data.client_reporting_date) : null
    },
    wordPressDetails: {
      service_name: data?.service_name,
      service_area: data?.service_area,
      referral_website: data?.referral_website,
      notes: data?.notes,
      work_status: data?.work_status
    }
  }
}
