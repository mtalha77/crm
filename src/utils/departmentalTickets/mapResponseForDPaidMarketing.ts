import { DPaidMarketingFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDPaidMarketing = (data: any): DPaidMarketingFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    paidMarketingDetails: {
      service_name: data?.service_name,
      location: data?.location,
      ad_account_access: data?.ad_account_access,
      budget: data?.budget,
      budget_price: data?.budget_price,
      clients_objectives: data?.clients_objectives,
      notes: data?.notes,
      work_status: data?.work_status,
      platform_name: data?.platform_name
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
