import { DLocalSeoFormType } from 'src/interfaces/departmentalForms.interface'
import * as yup from 'yup'

export const dLocalSeoYupSchema: yup.ObjectSchema<DLocalSeoFormType> = yup.object().shape({
  priority: yup.string().max(200, 'Priority Level cannot exceed 200 characters').required('Priority Level is required'),
  due_date: yup
    .date()
    .transform(originalValue => {
      const parsedDate = new Date(originalValue)
      return isNaN(parsedDate.getTime()) ? null : parsedDate
    })
    .required('Due Date is required'),

  localSeoDetails: yup.object().shape({
    notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    work_status: yup.string().max(200, 'Work Status cannot exceed 200 characters').required('Work Status is required')
  })
})
