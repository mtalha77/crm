import { ChildWebSeoFormType } from 'src/interfaces/childTicketForms.interface'
import * as yup from 'yup'

export const ChildWebSeoYupSchema: yup.ObjectSchema<ChildWebSeoFormType> = yup.object().shape({
  priority: yup.string().max(200, 'Priority Level cannot exceed 200 characters').required('Priority Level is required'),
  due_date: yup
    .date()
    .transform(originalValue => {
      const parsedDate = new Date(originalValue)

      return isNaN(parsedDate.getTime()) ? null : parsedDate
    })
    .required('Due Date is required'),
  webSeoDetails: yup.object().shape({
    notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    service_name: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    service_area: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    referral_website: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    work_status: yup.string().max(200, 'Work Status cannot exceed 200 characters').required('Work Status is required'),
    service_location: yup.string().max(200, 'service location cannot exceed 200 characters'),
    key_words: yup.string().max(200, 'key words cannot exceed 200 characters'),
    login_credentials: yup.string().max(200, 'login credentials cannot exceed 200 characters'),
    console_access: yup.string().max(200, 'console access cannot exceed 200 characters'),
    analytics_access: yup.string().max(200, 'analytics access cannot exceed 200 characters'),
    no_of_backlinks: yup.string().max(200, 'no of backlinks access cannot exceed 200 characters'),
    no_of_posts: yup.string().max(200, 'no of posts access cannot exceed 200 characters'),
    no_of_blogs: yup.string().max(200, 'no of blogs access cannot exceed 200 characters')
  })
})
