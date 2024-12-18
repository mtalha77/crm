import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)

const ViewFullHostingFormDetails = ({ id }: any) => {
  const [apiLoading, setApiLoading] = useState(false)
  const [data, setData] = useState<any>({})

  const fetchHostingForm = async () => {
    setApiLoading(true)
    axios
      .get(`/api/hosting-forms/get-single-full?_id=${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(res => {
        setData(res.data.payload.hostingForm)
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(error?.response?.data)
      })
      .finally(() => {
        setApiLoading(false)
      })
  }

  useEffect(() => {
    fetchHostingForm()
  }, [id])

  if (apiLoading) {
    return (
      <>
        <FallbackSpinner showIcon={true} />
      </>
    )
  }

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant='h5' color={'primary'}>
              Hosting Details
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BoldText>Business Name:</BoldText> {data.business?.business_name}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Creation Date:</BoldText>{' '}
              {data.creation_date ? moment(data.creation_date).format('MMMM Do YYYY') : 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Hosting Name:</BoldText> {data.hosting_name || 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Expiration Date:</BoldText>{' '}
              {data.expiration_date ? moment(data.expiration_date).format('MMMM Do YYYY') : 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Price:</BoldText> {data.price || 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Live Status:</BoldText> {data.live_status || 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>List Status:</BoldText> {data.list_status || 'N/A'}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Hosting Approved By:</BoldText> {data.hostingApprovedBy || 'N/A'}
            </Grid>{' '}
            <Grid item xs={6}>
              <BoldText>Hosting Holder:</BoldText> {data.hosting_holder || 'N/A'}
            </Grid>{' '}
            <Grid item xs={6}>
              <BoldText>Hosting Platform:</BoldText> {data.hosting_platform || 'N/A'}
            </Grid>
            <Grid item xs={12}>
              <BoldText>Notes:</BoldText> {data.notes || 'N/A'}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ViewFullHostingFormDetails
