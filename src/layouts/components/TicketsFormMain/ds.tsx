import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Spinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { DesignerFormType, designerDefaultValues, writerDefaultValues } from 'src/interfaces/forms.interface'
import { Department } from 'src/shared/enums/Department.enum'
import DesignerForm from '../newTicketForm/Departments/Designer'
import { designerYupSchema } from 'src/yupSchemas/designerYupSchema'
import { mapResponseForDesigner } from 'src/utils/mapResponseForDesigner'

const schema = designerYupSchema

const DesignerFormComponent = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [apiLoading, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [business_id, setBusiness_id] = useState('')
  const defaultValues = async () => {
    if (!ticketId) {
      setUpdate(false)

      return writerDefaultValues
    }
    try {
      setApiLoading(true)
      const res = await axios.get(`/api/business-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      setUpdate(true)
      setBusiness_id(res.data.payload.ticket.business_id)

      return mapResponseForDesigner(res.data.payload.ticket)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()

  const onSubmit = async (data: DesignerFormType) => {
    const { business, saleDepart, ticketDetails, designerFormTypeDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.Designer)

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
      notes: designerFormTypeDetails.notes,
      task_details: designerFormTypeDetails.task_details,
      work_status: designerFormTypeDetails.work_status,
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
          methods.reset(designerDefaultValues)
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
          {apiLoading ? <Spinner /> : <DesignerForm update={update} />}
        </form>
      </FormProvider>
    </>
  )
}

export default DesignerFormComponent
