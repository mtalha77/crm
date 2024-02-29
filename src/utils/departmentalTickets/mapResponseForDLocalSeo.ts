import { DLocalSeoFormType } from 'src/interfaces/departmentalForms.interface'

export const mapResponseForDLocalSeo = (data: any): DLocalSeoFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    localSeoDetails: {
      notes: data.notes,
      work_status: data.work_status
    }
  }
}
