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
    work_status: yup
      .string()
      .max(200, 'SubCategories cannot exceed 200 characters')
      .required('SubCategories is required')
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
