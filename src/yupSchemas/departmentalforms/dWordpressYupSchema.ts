import { DWordPressFormType } from 'src/interfaces/departmentalForms.interface'
import * as yup from 'yup'

export const DWordPressYupSchema: yup.ObjectSchema<DWordPressFormType> = yup.object().shape({
  priority: yup.string().max(200, 'Priority Level cannot exceed 200 characters').required('Priority Level is required'),
  due_date: yup
    .date()
    .transform(originalValue => {
      const parsedDate = new Date(originalValue)
      return isNaN(parsedDate.getTime()) ? null : parsedDate
    })
    .required('Due Date is required'),
  wordPressDetails: yup.object().shape({
    notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    service_name: yup.string().max(200, 'service name cannot exceed 200 characters'),
    service_area: yup.string().max(200, 'service area cannot exceed 200 characters'),
    referral_website: yup.string().max(200, 'referral website cannot exceed 200 characters'),
    work_status: yup.string().max(200, 'Work Status cannot exceed 200 characters').required('Work Status is required')
  })
})
