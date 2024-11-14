import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'

import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import { ChildPaidMarketingDefaultValues, ChildPaidMarketingFormType } from 'src/interfaces/childTicketForms.interface'
import { mapResponseForChildPaidMarketing } from 'src/utils/childTickets/mapResponseForChildPaidMarketing'
import { ChildPaidMarketingYupSchema } from 'src/yupSchemas/childTickets/childPaidMarketingYupSchema'
import FormsHeader from '../newTicketForm/Header'
import SubmitButton from '../newTicketForm/SharedField/FormButton'
import Common from './Common'
import DPaidMarketingSpecificDetails from '../newTicketForm/Departments/Marketing/DPaidMarketingSpecificDetails';

const schema = ChildPaidMarketingYupSchema

const ChildPaidMarketingFormComponent = () => {
  const router = useRouter()
  const { ticketId, parentId, businessId } = router.query
  const [, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)

  const methods = useForm({
    defaultValues: ChildPaidMarketingDefaultValues,
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
      const mapResult = mapResponseForChildPaidMarketing(res.data.payload.ticket)
      methods.reset(mapResult)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      methods.reset(ChildPaidMarketingDefaultValues)
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (ticketId) {
      fetchTicket()
    }
  }, [ticketId])

  const onSubmit = async (data: ChildPaidMarketingFormType) => {
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
      business_id: businessId,
      parentId
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
      const apiUrl = '/api/department-ticket/create-child'

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
                      Generate New Linked Ticket For Paid Marketing
                    </Typography>
                  }
                />
                <Divider sx={{ m: '0 !important' }} />
                <CardContent>
                  <FormsHeader title='Ticket Details'>
                    <DPaidMarketingSpecificDetails />
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

export default ChildPaidMarketingFormComponent
