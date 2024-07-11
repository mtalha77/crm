import { SocialMediaFormType } from 'src/interfaces/forms.interface'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import * as yup from 'yup'

export const socialMediaYupSchema: yup.ObjectSchema<SocialMediaFormType> = yup.object().shape({
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
    gmb_url: yup.string().max(200, 'GMB URL cannot exceed 200 characters'),
    client_name: yup.string().max(200, 'Client Name cannot exceed 200 characters')
  }),
  saleDepart: yup.object().shape({
    fronter: yup
      .string()
      .max(200, 'Fronter cannot exceed 200 characters')
      .when('sale_type', {
        is: (sale_type: SaleType) => sale_type === SaleType.NEW_SALE,
        then: () => yup.string().required('Fronter is required')
      }),
    fronter_id: yup
      .string()
      .max(200, 'Fronter ID cannot exceed 200 characters')
      .when('sale_type', {
        is: (sale_type: SaleType) => sale_type === SaleType.NEW_SALE,
        then: () => yup.string().required('Fronter ID is required')
      }),
    closer: yup.string().max(200, 'Closer cannot exceed 200 characters').required('Closer is required'),
    closer_id: yup.string().max(200, 'Closer ID cannot exceed 200 characters').required('Closer ID is required'),
    sale_type: yup.string().max(200, 'Sale Type cannot exceed 200 characters').required('Sale Type is required')
  }),
  ticketDetails: yup.object().shape({
    priority: yup
      .string()
      .max(200, 'Priority Level cannot exceed 200 characters')
      .required('Priority Level is required'),

    // due_date: yup
    //   .date()
    //   .transform(originalValue => {
    //     const parsedDate = new Date(originalValue)

    //     return isNaN(parsedDate.getTime()) ? null : parsedDate
    //   })
    //   .required('Due Date is required'),
    total_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .required('Price is required'),
    advance_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .required('Advance is required'),
    remaining_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .required('Remaining is required'),
    client_reporting_date: yup.date().nullable(),
    remaining_price_date: yup.date().nullable(),
    ticket_notes: yup.string().max(2000, 'Ticket notes cannot exceed 2000 characters'),
    client_reporting_notes: yup.string().max(2000, 'Ticket notes cannot exceed 2000 characters')
  }),
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
  })
})
