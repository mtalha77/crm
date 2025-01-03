import { DWriterFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDWriter = (data: any): DWriterFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    writerFormTypeDetails: {
      notes: data.notes,
      task_details: data.task_details,
      total_number_for_writers_depart: data.total_number_for_writers_depart, // New field
      total_number_of_words_writers_depart: data.total_number_of_words_writers_depart, // New field
      keywords_for_writers_depart: data.keywords_for_writers_depart, // New field
      work_status: data.work_status, // New field
      platform_name: data.platform_name // New field
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
