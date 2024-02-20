export const mapResponseForLocalSeo = (data: any) => {
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
      social_profile: data.business_id.social_profile
    },
    saleDepart: {
      fronter: data.fronter,
      fronter_id: data.fronter_id,
      closer: data.closer,
      closer_id: data.closer_id,
      sale_type: 'UP SALE'
    },
    ticketDetails: {
      priority: data.priority,
      due_date: new Date(data.due_date),
      total_payment: 0,
      advance_payment: 0,
      remaining_payment: 0,
      client_reporting_date: data.client_reporting_date ? new Date(data.client_reporting_date) : null
    },
    localSeoDetails: {
      gmb_url: data.gmb_url,
      notes: data.notes,
      work_status: data.work_status
    }
  }
}
