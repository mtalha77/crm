import { DDesignerFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDDesigner = (data: any): DDesignerFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    designerFormTypeDetails: {
      notes: data?.notes,
      task_details: data?.task_details
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
