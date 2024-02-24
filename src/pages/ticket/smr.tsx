import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SmmForm from 'src/layouts/components/newTicketForm/Departments/SMM'
import { SocialMediaFormType, socialMediaDefaultValues } from 'src/interfaces/forms.interface'
import { socialMediaYupSchema } from 'src/yupSchemas/socialMediaYupSchema'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import axios from 'axios'
import toast from 'react-hot-toast'

const defaultValues = socialMediaDefaultValues

const schema = socialMediaYupSchema

const Ticket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })

  const { departments } = useAuth()
  const onSubmit = async (data: SocialMediaFormType) => {
    const { business, saleDepart, ticketDetails, socialMediaFormTypeDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.SocialMedia)

    const requestData = {
      priority: ticketDetails.priority,
      assignee_depart_id: depart._id,
      assignee_depart_name: depart.name,
      client_reporting_date: ticketDetails.client_reporting_date,
      due_date: ticketDetails.due_date,
      fronter: saleDepart.fronter,
      closer: saleDepart.closer,
      closer_id: saleDepart.closer_id,
      fronter_id: saleDepart.fronter_id,
      sales_type: saleDepart.sale_type,
      payment_history: [
        {
          total_payment: ticketDetails.total_payment,
          advance_payment: ticketDetails.advance_payment,
          remaining_payment: ticketDetails.remaining_payment
        }
      ],
      business_name: business.business_name,
      business_number: business.business_number,
      business_hours: business.business_hours,
      business_email: business.business_email,
      state: business.state,
      country: business.country,
      street: business.street,
      zip_code: business.zip_code,
      social_profile: business.social_profile,
      website_url: business.website_url,
      work_status: socialMediaFormTypeDetails.work_status,
      gmb_url: business.gmb_url,
      notes: socialMediaFormTypeDetails.notes,
      service_name: socialMediaFormTypeDetails.service_name,
      login_credentials: socialMediaFormTypeDetails.login_credentials,
      facebook_url: socialMediaFormTypeDetails.facebook_url,
      platform_name: socialMediaFormTypeDetails.platform_name,
      no_of_likes: socialMediaFormTypeDetails.no_of_likes,
      no_of_gmb_reviews: socialMediaFormTypeDetails.no_of_gmb_reviews,
      no_of_posts: socialMediaFormTypeDetails.no_of_posts
    }

    const apiUrl = '/api/business-ticket/create'

    await axios
      .post(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        toast.success('Ticket created successfully')
        methods.reset(defaultValues)
      })
      .catch(error => {
        console.error('Error:', error)
        toast.error(error?.response?.data || 'Something went wrong')
      })
  }

  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          <SmmForm />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
