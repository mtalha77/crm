import { ChildWriterFormType } from 'src/interfaces/childTicketForms.interface'
import * as yup from 'yup'

export const ChildWriterYupSchema: yup.ObjectSchema<ChildWriterFormType> = yup.object().shape({
  priority: yup.string().max(200, 'Priority Level cannot exceed 200 characters').required('Priority Level is required'),
  due_date: yup
    .date()
    .transform(originalValue => {
      const parsedDate = new Date(originalValue)

      return isNaN(parsedDate.getTime()) ? null : parsedDate
    })
    .required('Due Date is required'),
  writerFormTypeDetails: yup.object().shape({
    notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    task_details: yup.string().max(1000, 'task details cannot exceed 1000 characters')
  })
})
