import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import BusinessTicketsTable from './tables/businessTicketsTable'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function ViewFullBusinessDetails({ id }: any) {
  const [apiLoading, setApiLoading] = useState(true)
  const [data, setData] = useState<any>({})

  const fetchBusiness = async () => {
    setApiLoading(true)
    axios
      .get(`/api/business/${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(res => {
        setData(res.data.payload.business)
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
    fetchBusiness()
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BoldText>Status:</BoldText> {data?.status}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Name:</BoldText> {data?.business_name}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Email:</BoldText> {data?.business_email}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Number:</BoldText> {data?.business_number}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Hours:</BoldText> {data?.business_hours}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Client Name:</BoldText> {data?.client_name}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Country:</BoldText> {data?.country}
        </Grid>

        <Grid item xs={6}>
          <BoldText>State:</BoldText> {data?.state}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Street:</BoldText> {data?.street}
        </Grid>

        <Grid item xs={6}>
          <BoldText>ZipCode:</BoldText> {data?.zip_code}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Website Url:</BoldText> {data?.website_url}
        </Grid>

        <Grid item xs={6}>
          <BoldText>Social Profile:</BoldText> {data?.social_profile}
        </Grid>

        <Grid item xs={6} mb={10}>
          <BoldText>Gmb Url:</BoldText> {data?.gmb_url}
        </Grid>
      </Grid>
      <BusinessTicketsTable businessIdProps={id} />
    </>
  )
}

export default ViewFullBusinessDetails
