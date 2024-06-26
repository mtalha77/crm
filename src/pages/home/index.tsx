// home.tsx
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Avatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import DepartmentalTicketCards from 'src/layouts/components/cards/DepartmentalTicketsCards'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import BusinessTicketCards from '../../layouts/components/BusinessTicketCards/BusinessTicketCards'
import dayjs from 'dayjs'
import ClientReportatingDateDueTicketsTable from 'src/layouts/components/tables/ClientReportatingDateDueTicketsTable'
import RemainingPriceDateDueTicketsTable from 'src/layouts/components/tables/RemainingPriceDueDateTicketsTable'
import ExpiredDomainFormsTable from 'src/layouts/components/tables/columns/ExpiredDomainFormsTable'
import { Department } from 'src/shared/enums/Department.enum'

const Home = () => {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState('')
  const [statusCounts, setStatusCounts] = useState()
  const [expiringSoonForms, setExpiringSoonForms] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const [cltickets, setCltickets] = useState<any>([])
  const [rptickets, setRpTickets] = useState([])

  const [clticketsLoading, setClTicketsLoading] = useState(true)
  const [rpticketsLoading, setRpTicketsLoading] = useState(true)

  useEffect(() => {
    const temp = async () => {
      await axios
        .post(
          '/api/business-ticket/get-analytics',
          {},
          {
            headers: {
              authorization: localStorage.getItem('token')
            }
          }
        )
        .then(res => {
          setStatusCounts(res.data.payload.analytics[0])
        })
        .catch(err => {
          console.log(err)
        })
    }
    temp()
  }, [])

  useEffect(() => {
    const fetchExpiringSoonForms = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/domain-forms/get-expired', {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        setExpiringSoonForms(response.data.payload.domainForms)
      } catch (error) {
        console.error('Error fetching expiring soon domain forms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpiringSoonForms()
  }, [])

  useEffect(() => {
    const temp = async () => {
      setClTicketsLoading(true)
      await axios
        .get(`/api/business-ticket/get-client-reporting-due-date-passed?date=${dayjs().endOf('day').toISOString()}`, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          setCltickets(res.data.payload.tickets)
          setClTicketsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SALE_MANAGER || user?.role === UserRole.TEAM_LEAD)
      temp()
  }, [])

  useEffect(() => {
    const temp = async () => {
      setRpTicketsLoading(true)
      await axios
        .get(`/api/business-ticket/get-remaining-price-due-date-passed?date=${dayjs().endOf('day').toISOString()}`, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          setRpTickets(res.data.payload.tickets)
          setRpTicketsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SALE_MANAGER) temp()
  }, [])

  useEffect(() => {
    // Get current time
    const currentTime = new Date()

    // Set Colorado time zone
    const coloradoTime = currentTime.toLocaleString('en-US', {
      timeZone: 'America/Denver',
      hour12: true,
      hour: 'numeric'
    })

    // Extract hour from Colorado time
    const hour = parseInt(coloradoTime)

    // Determine the greeting based on the hour
    let newGreeting = ''
    if (hour >= 0 && hour < 12) {
      newGreeting = 'Good Morning'
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Good Afternoon'
    } else {
      newGreeting = 'Good Evening'
    }

    // Add an excited message to the greeting
    const excitedMessage = 'Welcome back to your dashboard!'

    // Combine the greeting with the excited message
    const greetingMessage = `${newGreeting}, ${user?.user_name}! ${excitedMessage}`

    // Update state with the greeting
    setGreeting(greetingMessage)
  }, []) // Run only once when component mounts

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card sx={{ pt: '20px', pb: '20px', border: 0, color: 'common.white', backgroundColor: '#666CFF' }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography
                variant='h4'
                sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
              >
                <Avatar alt='Eugene Clarke' src='/images/avatars/1.png' sx={{ width: 34, height: 34, mr: 2.75 }} />
                {`${user?.user_name}`}
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '16px', mb: 3, color: 'common.white' }}>
                {`${greeting}`}
              </Typography>
              <Box
                sx={{
                  borderTop: '1px solid rgba(76, 78, 100, 0.8)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mt: '5px', color: 'common.white', fontSize: '17px' }}>
                    {`Role: ${user?.role}`}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <BusinessTicketCards statusCounts={statusCounts} />
      {user?.role !== UserRole.SALE_EMPLOYEE && user?.role !== UserRole.SALE_MANAGER && <DepartmentalTicketCards />}

      {/* {(user?.role === UserRole.ADMIN || user?.role === UserRole.SALE_MANAGER) && (
        <Card sx={{ mt: 10 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
              Overdue Business Tickets
            </Typography>
            <DueDateTicketsTable data={tickets} isLoading={ticketsLoading} />
          </CardContent>
        </Card>
      )} */}

      {(user?.role === UserRole.ADMIN || user?.role === UserRole.SALE_MANAGER || user?.role === UserRole.TEAM_LEAD) && (
        <Card sx={{ mt: 10 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
              Overdue Client Reports Business Tickets
            </Typography>
            <ClientReportatingDateDueTicketsTable data={cltickets} isLoading={clticketsLoading} />
          </CardContent>
        </Card>
      )}

      {(user?.role === UserRole.ADMIN || user?.role === UserRole.SALE_MANAGER) && (
        <Card sx={{ mt: 10 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
              Overdue Remaining Price Business Tickets
            </Typography>
            <RemainingPriceDateDueTicketsTable data={rptickets} isLoading={rpticketsLoading} />
          </CardContent>
        </Card>
      )}
      {(user?.role === UserRole.ADMIN ||
        (user?.role === UserRole.TEAM_LEAD && user?.department_name === Department.WordPress)) && (
        <Card sx={{ mt: 10 }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h4' sx={{ mb: 5, textAlign: 'center' }}>
              Expiring Soon or Expired Domain Forms
            </Typography>
            <ExpiredDomainFormsTable data={expiringSoonForms} isLoading={loading} />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Home
