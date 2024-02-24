import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Wordpress from 'src/layouts/components/newTicketForm/Departments/Wordpress'
import { WordPressFormType, wordPressDefaultValues } from 'src/interfaces/forms.interface'
import { wordPressYupSchema } from 'src/yupSchemas/wordpressYupSchema'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import axios from 'axios'
import toast from 'react-hot-toast'

const defaultValues = wordPressDefaultValues

const schema = wordPressYupSchema

const Ticket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()
  const onSubmit = async (data: WordPressFormType) => {
    const { business, saleDepart, ticketDetails, wordPressDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.WordPress)

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
      work_status: wordPressDetails.work_status,
      gmb_url: business.gmb_url,
      notes: wordPressDetails.notes,
      service_name: wordPressDetails.service_name,
      service_area: wordPressDetails.service_area,
      referral_website: wordPressDetails.referral_website
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
          <Wordpress />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
