import { Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import LocalSeoView from 'src/layouts/components/ticket-view-department-wise/LocalSeoView'
import PaidMarketingView from 'src/layouts/components/ticket-view-department-wise/PaidMarketingView'
import SocialMediaView from 'src/layouts/components/ticket-view-department-wise/SocialMediaView'
import WebSeoView from 'src/layouts/components/ticket-view-department-wise/WebSeoView'
import WordPressView from 'src/layouts/components/ticket-view-department-wise/WordPressView'
import { Department } from 'src/shared/enums/Department.enum'
import WriterView from './ticket-view-department-wise/WriterView'
import DesignerView from './ticket-view-department-wise/DesignerView'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)

const ViewFullDepartmentalTicketDetails = ({ ticketId, depart }: any) => {
  // const router = useRouter()
  const [apiLoading, setApiLoading] = useState(false)
  const [data, setData] = useState<any>({})

  const { business_id } = data
  const fetchTicket = async () => {
    setApiLoading(true)
    axios
      .post(
        `/api/department-ticket/get-single-full`,
        { ticketId },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      .then(res => {
        setData(res.data.payload.ticket)
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
    fetchTicket()
  }, [ticketId])

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
              Business Details
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BoldText>Name:</BoldText> {business_id?.business_name}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Email:</BoldText> {business_id?.business_email}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Number:</BoldText> {business_id?.business_number}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Hours:</BoldText> {business_id?.business_hours}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Country:</BoldText> {business_id?.country}
            </Grid>

            <Grid item xs={6}>
              <BoldText>State:</BoldText> {business_id?.state}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Street:</BoldText> {business_id?.street}
            </Grid>

            <Grid item xs={6}>
              <BoldText>ZipCode:</BoldText> {business_id?.zip_code}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Website Url:</BoldText> {business_id?.website_url}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Social Profile:</BoldText> {business_id?.social_profile}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Gmb Url:</BoldText> {business_id?.gmb_url}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 6 }}>
        <CardHeader
          title={
            <Typography variant='h5' color={'primary'}>
              Ticket Details
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          {' '}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BoldText>Priority Level:</BoldText> {data?.priority}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Status:</BoldText> {data?.status}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Due Date:</BoldText> {moment(data?.due_date).format('MMMM Do YYYY')}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Assignor Department:</BoldText> {data?.assignor_depart_name}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Assignee Department:</BoldText> {data?.assignee_depart_name}
            </Grid>

            <Grid item xs={6}>
              <Grid container>
                <Grid item>
                  <BoldText>Assignee Employee:</BoldText>{' '}
                </Grid>
                <Grid item sx={{ marginLeft: '5px', width: '60%' }}>
                  <Grid container gap={2}>
                    {data?.assignee_employees &&
                      data?.assignee_employees.map((e: any) => {
                        return (
                          <Grid item key={e.user_name}>
                            <Chip style={{ borderRadius: '8px' }} color='primary' label={e.user_name} size='small' />
                          </Grid>
                        )
                      })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <BoldText>Created By:</BoldText> {data?.created_by?.user_name}
            </Grid>

            <Grid item xs={6}>
              <BoldText>Date Of Creation:</BoldText> {moment(data?.createdAt).format('MMMM Do YYYY')}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Department Specific Details Section */}

      <Card sx={{ mt: 6 }}>
        <CardHeader
          title={
            <Typography variant='h5' color={'primary'}>
              Department Specific Details
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          {depart === Department.LocalSeo && <LocalSeoView data={data} />}
          {depart === Department.WordPress && <WordPressView data={data} />}
          {depart === Department.WebSeo && <WebSeoView data={data} />}
          {depart === Department.PaidMarketing && <PaidMarketingView data={data} />}
          {depart === Department.SocialMedia && <SocialMediaView data={data} />}
          {depart === Department.Writer && <WriterView data={data} />}
          {depart === Department.Designer && <DesignerView data={data} />}
        </CardContent>
      </Card>
    </>
  )
}

export default ViewFullDepartmentalTicketDetails
