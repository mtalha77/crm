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
import { DSocialMediaFormType, dSocialMediaDefaultValues } from 'src/interfaces/departmentalForms.interface'
import { mapResponseForDSocialMedia } from 'src/utils/departmentalTickets/mapResponseForDSocialMedia'
import { DSocialMediaYupSchema } from 'src/yupSchemas/departmentalforms/dSocialMediaYupSchema'
import FormsHeader from '../newTicketForm/Header'
import DBusinessDetails from '../newTicketForm/SharedField/DBusinessDetails'
import SubmitButton from '../newTicketForm/SharedField/FormButton'
import Common from './Common'
import DSocialMediaSpecificDetails from '../newTicketForm/Departments/SMM/DSocialMediaSpecificDetails'

const schema = DSocialMediaYupSchema

const DSocialMediaFormComponent = () => {
  const router = useRouter()
  const { ticketId } = router.query
  const [, setApiLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [business_id, setBusiness_id] = useState('')

  const methods = useForm({ defaultValues: dSocialMediaDefaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const { departments } = useAuth()

  const fetchTicket = async () => {
    try {
      setUpdate(true)
      setApiLoading(true)
      const res = await axios.get(`/api/department-ticket/${ticketId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      const mapResult = mapResponseForDSocialMedia(res.data.payload.ticket)
      methods.reset(mapResult)
    } catch (error: any) {
      toast.error(error?.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      methods.reset(dSocialMediaDefaultValues)
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (ticketId) {
      fetchTicket()
    }
  }, [ticketId])

  const onSubmit = async (data: DSocialMediaFormType) => {
    const { priority, due_date, socialMediaFormTypeDetails } = data

    // Create a new object with the destructured properties
    const depart: any = departments.find((d: any) => d.name === Department.SocialMedia)

    const requestData = {
      priority: priority,
      assignee_depart_id: depart._id,
      assignee_depart_name: depart.name,
      due_date: due_date,
      work_status: socialMediaFormTypeDetails.work_status,
      notes: socialMediaFormTypeDetails.notes,
      service_name: socialMediaFormTypeDetails.service_name,
      login_credentials: socialMediaFormTypeDetails.login_credentials,
      facebook_url: socialMediaFormTypeDetails.facebook_url,
      platform_name: socialMediaFormTypeDetails.platform_name,
      no_of_likes: socialMediaFormTypeDetails.no_of_likes,
      no_of_gmb_reviews: socialMediaFormTypeDetails.no_of_gmb_reviews,
      no_of_posts: socialMediaFormTypeDetails.no_of_posts,
      ticketId: ticketId,
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
                      {update ? 'Update Ticket' : 'Generate New Ticket For Social Media'}
                    </Typography>
                  }
                />
                <Divider sx={{ m: '0 !important' }} />
                <CardContent>
                  <FormsHeader title='Business Details'>
                    <DBusinessDetails update={true} setBusiness_id={setBusiness_id} />
                  </FormsHeader>
                  <FormsHeader title='Ticket Details'>
                    <DSocialMediaSpecificDetails />
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

export default DSocialMediaFormComponent
