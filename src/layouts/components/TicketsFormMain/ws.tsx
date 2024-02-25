import React, { useState } from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { WebSeoFormType, webSeoDefaultValues } from 'src/interfaces/forms.interface'
import { webSeoYupSchema } from 'src/yupSchemas/webSeoYupSchema'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import axios from 'axios'
import toast from 'react-hot-toast'
import WebSeoForm from 'src/layouts/components/newTicketForm/Departments/WebSeo'
import { useRouter } from 'next/router'
import { mapResponseForWebSeo } from 'src/utils/mapResponseForWebSeo'
import Spinner from 'src/@core/components/spinner'

const schema = webSeoYupSchema

const WebSeoFormComponent = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [apiLoading, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [business_id, setBusiness_id] = useState('')
  const defaultValues = async () => {
    if (!ticketId) {
      setUpdate(false)
      return webSeoDefaultValues
    }
    try {
      setApiLoading(true)
      const res = await axios.get(`/api/business-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      setUpdate(true)
      setBusiness_id(res.data.payload.ticket.business_id)
      return mapResponseForWebSeo(res.data.payload.ticket)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }
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
      gmb_url: business.gmb_url,
      notes: webSeoDetails.notes,
      service_name: webSeoDetails.service_name,
      service_location: webSeoDetails.service_location,
      key_words: webSeoDetails.key_words,
      login_credentials: webSeoDetails.login_credentials,
      console_access: webSeoDetails.console_access,
      analytics_access: webSeoDetails.analytics_access,
      no_of_backlinks: webSeoDetails.no_of_backlinks,
      no_of_posts: webSeoDetails.no_of_posts,
      no_of_blogs: webSeoDetails.no_of_blogs,
      business_id,
      ticketId
    }

    if (update) {
      const apiUrl = '/api/business-ticket/update'

      await axios
        .put(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
        .then(() => {
          toast.success('Ticket updated successfully')
        })
        .catch(error => {
          console.error('Error:', error)
          toast.error(error?.response?.data || 'Something went wrong')
        })
    } else {
      const apiUrl = '/api/business-ticket/create'

      await axios
        .post(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
        .then(() => {
          toast.success('Ticket created successfully')
          methods.reset(webSeoDefaultValues)
        })
        .catch(error => {
          console.error('Error:', error)
          toast.error(error?.response?.data || 'Something went wrong')
        })
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          {apiLoading ? <Spinner /> : <WebSeoForm update={update} />}
        </form>
      </FormProvider>
    </>
  )
}

export default WebSeoFormComponent
