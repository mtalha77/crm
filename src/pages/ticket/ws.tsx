import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { WebSeoFormType, webSeoDefaultValues } from 'src/interfaces/forms.interface'
import { webSeoYupSchema } from 'src/yupSchemas/webSeoYupSchema'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import axios from 'axios'
import toast from 'react-hot-toast'
import WebSeoForm from 'src/layouts/components/newTicketForm/Departments/WebSeo'

const defaultValues = webSeoDefaultValues

const schema = webSeoYupSchema

const Ticket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()
  const onSubmit = async (data: WebSeoFormType) => {
    const { business, saleDepart, ticketDetails, webSeoDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.WebSeo)

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
      work_status: webSeoDetails.work_status,
      gmb_url: webSeoDetails.gmb_url,
      notes: webSeoDetails.notes,
      service_name: webSeoDetails.service_name,
      service_location: webSeoDetails.service_location,
      key_words: webSeoDetails.key_words,
      login_credentials: webSeoDetails.login_credentials,
      console_access: webSeoDetails.console_access,
      analytics_access: webSeoDetails.analytics_access
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
          <WebSeoForm />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
