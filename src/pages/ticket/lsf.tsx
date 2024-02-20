import React, { useEffect, useState } from 'react'
import LocalSeoForm from 'src/layouts/components/newTicketForm/Departments/LocalSeo'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import toast from 'react-hot-toast'
import { LocalSeoFormType, localSeoDefaultValues } from 'src/interfaces/forms.interface'
import { localSeoYupSchema } from 'src/yupSchemas/localSeoYupSchema'
import { useRouter } from 'next/router'
import { mapResponseForLocalSeo } from 'src/utils/mapResponseForLocalSeo'

const schema = localSeoYupSchema

const Ticket = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [apiLoading, setApiLoading] = useState(true)
  const defaultValues = async () => {
    if (!ticketId) return localSeoDefaultValues
    try {
      setApiLoading(true)
      const res = await axios.get(`/api/business-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      return mapResponseForLocalSeo(res.data.payload.ticket)
    } catch (error) {
      toast.error('Network error. Please refresh the page')
    } finally {
      setApiLoading(false)
    }
  }
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()

  const onSubmit = async (data: LocalSeoFormType) => {
    const { business, saleDepart, ticketDetails, localSeoDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.LocalSeo)

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
      work_status: localSeoDetails.work_status,
      gmb_url: localSeoDetails.gmb_url,
      notes: localSeoDetails.notes
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
          {!apiLoading && <LocalSeoForm />}
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
