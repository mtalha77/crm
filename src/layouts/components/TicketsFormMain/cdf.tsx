import { useState } from 'react'
import CustomDevForm from 'src/layouts/components/newTicketForm/Departments/CustomDev'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Spinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { CustomDevFormType, customDevDefaultValues } from 'src/interfaces/forms.interface'
import { Department } from 'src/shared/enums/Department.enum'
import { mapResponseForLocalSeo } from 'src/utils/mapResponseForLocalSeo'
import { customDevYupSchema } from 'src/yupSchemas/customDevYupSchema'

const schema = customDevYupSchema

const CustomDevFormComponent = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [apiLoading, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [business_id, setBusiness_id] = useState('')
  const defaultValues = async () => {
    if (!ticketId) {
      setUpdate(false)

      return customDevDefaultValues
    }
    try {
      setApiLoading(true)
      const res = await axios.get(`/api/business-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      setUpdate(true)
      setBusiness_id(res.data.payload.ticket.business_id)

      return mapResponseForLocalSeo(res.data.payload.ticket)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()

  const onSubmit = async (data: CustomDevFormType) => {

    const { business, saleDepart, ticketDetails, customDevDetails } = data

    const depart: any = departments.find((d: any) => d.name === Department.CustomDevelopment)

    const requestData = {
      priority: ticketDetails.priority,
      assignee_depart_id: depart._id,
      assignee_depart_name: depart.name,
      client_reporting_date: ticketDetails.client_reporting_date,
      remaining_price_date: ticketDetails.remaining_price_date,
      ticket_notes: ticketDetails.ticket_notes,
      client_reporting_notes: ticketDetails.client_reporting_notes,
      created_at: ticketDetails.created_at,
      otherSales: ticketDetails.otherSales,

      // due_date: ticketDetails.due_date,
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
      gmb_url: business.gmb_url,
      client_name: business.client_name,
      work_status: customDevDetails.work_status,
      service_name: customDevDetails.service_name,
      service_area: customDevDetails.service_area,
      notes: customDevDetails.notes,
      business_id: business_id,
      ticketId: ticketId
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
          methods.reset(customDevDefaultValues)
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
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit as any)}>
          {apiLoading ? <Spinner /> : <CustomDevForm update={update} />}
        </form>
      </FormProvider>
    </>
  )
}

export default CustomDevFormComponent
