import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PaidMarketingForm from 'src/layouts/components/newTicketForm/Departments/Marketing'
import { PaidMarketingFormType, paidMarketingDefaultValues } from 'src/interfaces/forms.interface'
import { paidMarketingYupSchema } from 'src/yupSchemas/paidMarketingYupSchema'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import axios from 'axios'
import toast from 'react-hot-toast'

const defaultValues = paidMarketingDefaultValues

const schema = paidMarketingYupSchema
const Ticket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()
  const onSubmit = async (data: PaidMarketingFormType) => {
    const { business, saleDepart, ticketDetails, paidMarketingDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.PaidMarketing)

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
      work_status: paidMarketingDetails.work_status,
      notes: paidMarketingDetails.notes,
      service_name: paidMarketingDetails.service_name,
      paid_marketing_location: paidMarketingDetails.location,
      ad_account_access: paidMarketingDetails.ad_account_access,
      budget: paidMarketingDetails.budget,
      budget_price: paidMarketingDetails.budget_price,
      clients_objectives: paidMarketingDetails.clients_objectives
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
          <PaidMarketingForm />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
