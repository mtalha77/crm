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
    }
  }
}
