import { ChildWriterFormType } from 'src/interfaces/childTicketForms.interface'

export const mapResponseForChildWriter = (data: any): ChildWriterFormType => {
  return {
    priority: data.priority,
    due_date: new Date(data.due_date),
    writerFormTypeDetails: {
      notes: data?.notes,
      task_details: data?.task_details,
      total_number_of_words_writer_: data?.total_number_of_words_writer_,
      total_number_for_writer_ticket: data?.total_number_for_writer_ticket,
      platform_name: data?.platform_name,
      key_words: data?.key_words
    }
  }
}
