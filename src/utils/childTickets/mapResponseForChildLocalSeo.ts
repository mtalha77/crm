import { ChildLocalSeoFormType } from 'src/interfaces/childTicketForms.interface'

export const mapResponseForChildLocalSeo = (data: any): ChildLocalSeoFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    localSeoDetails: {
      notes: data.notes,
      work_status: data.work_status,
      gmb_access_email: data.gmb_access_email
    }
  }
}
