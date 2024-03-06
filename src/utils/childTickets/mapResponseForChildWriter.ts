import { ChildWriterFormType } from 'src/interfaces/childTicketForms.interface'

export const mapResponseForChildWriter = (data: any): ChildWriterFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    writerFormTypeDetails: {
      notes: data?.notes,
      task_details: data?.task_details
    }
  }
}
