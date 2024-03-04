import React, { useEffect, useState } from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import { DPaidMarketingFormType, dPaidMarketingDefaultValues } from 'src/interfaces/departmentalForms.interface'
import Common from './Common'
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import FormsHeader from '../newTicketForm/Header'
import SubmitButton from '../newTicketForm/SharedField/FormButton'
import { mapResponseForDPaidMarketing } from 'src/utils/departmentalTickets/mapResponseForDPaidMarketing'
import { dPaidMarketingYupSchema } from 'src/yupSchemas/departmentalforms/dPaidMarketingYupSchema'
import PaidMarketingSpecificDetails from '../newTicketForm/Departments/Marketing/PaidMarketingSpecificDetails'
import DBusinessDetails from '../newTicketForm/SharedField/DBusinessDetails'

const schema = dPaidMarketingYupSchema

const DPaidMarketingFormComponent = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [apiLoading, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [business_id, setBusiness_id] = useState('')

  const methods = useForm({
    defaultValues: dPaidMarketingDefaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const { departments } = useAuth()

  const fetchTicket = async () => {
    try {
      setUpdate(true)
      setApiLoading(true)
      const res = await axios.get(`/api/department-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      const mapResult = mapResponseForDPaidMarketing(res.data.payload.ticket)
      methods.reset(mapResult)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      methods.reset(dPaidMarketingDefaultValues)
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (ticketId) {
      fetchTicket()
    }
  }, [ticketId])

  const onSubmit = async (data: DPaidMarketingFormType) => {
    const { priority, due_date, paidMarketingDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.PaidMarketing)

    const requestData = {
      priority: priority,
      assignee_depart_id: depart._id,
      assignee_depart_name: depart.name,
      due_date: due_date,
      work_status: paidMarketingDetails.work_status,
      notes: paidMarketingDetails.notes,
      service_name: paidMarketingDetails.service_name,
      paid_marketing_location: paidMarketingDetails.location,
      ad_account_access: paidMarketingDetails.ad_account_access,
      budget: paidMarketingDetails.budget,
      budget_price: paidMarketingDetails.budget_price,
      clients_objectives: paidMarketingDetails.clients_objectives,
      platform_name: paidMarketingDetails.platform_name,
      service_location: paidMarketingDetails.location,
      ticketId,
      business_id
    }
    if (update) {
      const apiUrl = '/api/department-ticket/update'

      await axios
        .put(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
        .then(() => {
          toast.success('Ticket updated successfully')
        })
        .catch(error => {
          console.error('Error:', error)
          toast.error(error?.response?.data || 'Network error')
        })
    } else {
      setIsSubmitSuccessful(false)
      const apiUrl = '/api/department-ticket/create'

      await axios
        .post(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
        .then(() => {
          toast.success('Ticket created successfully')
          setIsSubmitSuccessful(true)
        })
        .catch(error => {
          console.error('Error:', error)
          toast.error(error?.response?.data || 'Network error')
        })
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          {false ? (
            <Spinner />
          ) : (
            <>
              <Card>
                <CardHeader
                  title={
                    <Typography variant='h5' color={'primary'}>
                      {update ? 'Update Ticket' : ' Generate New Ticket For Paid Marketing'}
                    </Typography>
                  }
                />
                <Divider sx={{ m: '0 !important' }} />
                <CardContent>
                  <FormsHeader title='Business Details'>
                    <DBusinessDetails update={true} setBusiness_id={setBusiness_id} />
                  </FormsHeader>
                  <FormsHeader title='Ticket Details'>
                    <PaidMarketingSpecificDetails />
                  </FormsHeader>
                  <Box mt={6}></Box>
                  <Common />

                  <Box sx={{ my: '2rem ' }} />

                  <SubmitButton
                    beforeText={update ? 'Update' : 'Submit'}
                    afterText={update ? 'Updating' : 'Submitting'}
                    fullWidth
                    variant='contained'
                  />
                </CardContent>
              </Card>
            </>
          )}
        </form>
      </FormProvider>
    </>
  )
}

export default DPaidMarketingFormComponent
