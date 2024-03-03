import { ChildSocialMediaFormType } from 'src/interfaces/childTicketForms.interface'
import { DSocialMediaFormType } from 'src/interfaces/departmentalForms.interface'

import * as yup from 'yup'

export const ChildSocialMediaYupSchema: yup.ObjectSchema<ChildSocialMediaFormType> = yup.object().shape({
  priority: yup.string().max(200, 'Priority Level cannot exceed 200 characters').required('Priority Level is required'),
  due_date: yup
    .date()
    .transform(originalValue => {
      const parsedDate = new Date(originalValue)
      return isNaN(parsedDate.getTime()) ? null : parsedDate
    })
    .required('Due Date is required'),
  socialMediaFormTypeDetails: yup.object().shape({
    notes: yup.string().max(200, 'Notes cannot exceed 200 characters'),
    work_status: yup.string().max(200, 'Work Status cannot exceed 200 characters').required('Work Status is required'),
    facebook_url: yup.string().max(200, 'facebook url cannot exceed 200 characters'),
    service_name: yup.string().max(200, 'service name cannot exceed 200 characters'),
    login_credentials: yup.string().max(200, 'login credentials cannot exceed 200 characters'),
    platform_name: yup.string().max(200, 'platform name cannot exceed 200 characters'),
    no_of_likes: yup.string().max(200, 'no_of_likes cannot exceed 200 characters'),
    no_of_gmb_reviews: yup.string().max(200, 'no_of_gmb_reviews cannot exceed 200 characters'),
    no_of_posts: yup.string().max(200, 'no_of_posts cannot exceed 200 characters')
  })
})
