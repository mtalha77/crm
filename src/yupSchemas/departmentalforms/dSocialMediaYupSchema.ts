import { DSocialMediaFormType } from 'src/interfaces/departmentalForms.interface'

import * as yup from 'yup'

export const DSocialMediaYupSchema: yup.ObjectSchema<DSocialMediaFormType> = yup.object().shape({
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
    work_status: yup
      .string()
      .max(200, 'SubCategories cannot exceed 200 characters')
      .required('SubCategories is required'),
    facebook_url: yup.string().max(200, 'facebook url cannot exceed 200 characters'),
    service_name: yup.string().max(200, 'service name cannot exceed 200 characters'),
    login_credentials: yup.string().max(200, 'login credentials cannot exceed 200 characters'),
    platform_name: yup.string().max(200, 'platform name cannot exceed 200 characters'),
    no_of_likes: yup.string().max(200, 'no_of_likes cannot exceed 200 characters'),
    no_of_gmb_reviews: yup.string().max(200, 'no_of_gmb_reviews cannot exceed 200 characters'),
    no_of_posts: yup.string().max(200, 'no_of_posts cannot exceed 200 characters')
  }),
  business: yup.object().shape({
    business_name: yup
      .string()
      .max(200, 'Business Name cannot exceed 200 characters')
      .required('Business Name is required'),
    business_email: yup
      .string()
      .email('Invalid email')
      .max(200, 'Business Email cannot exceed 200 characters')
      .required('Business Email is required'),
    business_number: yup.string().max(200, 'Business Number cannot exceed 200 characters'),
    business_hours: yup.string().max(200, 'Business Hours cannot exceed 200 characters'),
    state: yup.string().max(200, 'State cannot exceed 200 characters'),
    country: yup.string().max(200, 'Country cannot exceed 200 characters'),
    zip_code: yup.string().max(200, 'Zip Code cannot exceed 200 characters'),
    street: yup.string().max(200, 'Street cannot exceed 200 characters'),
    website_url: yup.string().max(200, 'Website URL cannot exceed 200 characters'),
    social_profile: yup.string().max(200, 'Social Profile cannot exceed 200 characters'),
    gmb_url: yup.string().max(200, 'GMB URL cannot exceed 200 characters')
  })
})
