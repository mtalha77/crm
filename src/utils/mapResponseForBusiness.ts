export const mapResponseForBusiness = (data: any) => {
  return {
    business_name: data.business_name,
    business_email: data.business_email,
    business_number: data.business_number,
    business_hours: data.business_hours,
    state: data.state,
    country: data.country,
    zip_code: data.zip_code,
    street: data.street,
    website_url: data.website_url,
    social_profile: data.social_profile,
    gmb_url: data.gmb_url,
    client_name: data.client_name
  }
}
