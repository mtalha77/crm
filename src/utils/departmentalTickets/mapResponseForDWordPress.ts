import { DWordPressFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDWordPress = (data: any): DWordPressFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    wordPressDetails: {
      service_name: data?.service_name,
      service_area: data?.service_area,
      referral_website: data?.referral_website,
      notes: data?.notes,
      work_status: data?.work_status
    }
  }
}
