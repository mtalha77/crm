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

const ViewFullDomainFormDetails = ({ id }: any) => {
  const [apiLoading, setApiLoading] = useState(false)
  const [data, setData] = useState<any>({})

  const fetchDomainForm = async () => {
    setApiLoading(true)
    axios
      .get(`/api/domain-forms/get-single-full?_id=${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(res => {
        setData(res.data.payload.domainForm)
        console.log(data)
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
    fetchDomainForm()
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
              Domain Details
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BoldText>Creation Date:</BoldText> {moment(data.creation_date).format('MMMM Do YYYY')}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Domain Name:</BoldText> {data.domain_name}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Business Name:</BoldText> {data.business_name}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Expiration Date:</BoldText> {moment(data.expiration_date).format('MMMM Do YYYY')}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Price:</BoldText> {data.price}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Live Status:</BoldText> {data.live_status}
            </Grid>
            <Grid item xs={6}>
              <BoldText>List Status:</BoldText> {data.list_status}
            </Grid>
            <Grid item xs={6}>
              <BoldText>Domain Approved By:</BoldText> {data.domainApprovedBy}
            </Grid>{' '}
            <Grid item xs={6}>
              <BoldText>Domain Holder:</BoldText> {data.domain_holder}
            </Grid>{' '}
            <Grid item xs={6}>
              <BoldText>Domain Platform:</BoldText> {data.domain_platform}
            </Grid>
            <Grid item xs={12}>
              <BoldText>Notes:</BoldText> {data.notes}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ViewFullDomainFormDetails
