// ** MUI Imports
import { Grid, Paper } from '@mui/material'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import SimpleCard from '../cards/simpleCard'
import { useRouter } from 'next/router'

const series = [{ data: [0, 20, 5, 30, 15, 45] }]

const BusinessTicketCards = ({ statusCounts }: any) => {
  // ** Hook
  const router = useRouter()
  return (
    <>
      <Paper sx={{ mt: 8, mb: 6 }}>
        <Box textAlign={'center'} padding={3}>
          <Typography variant='h4'> Business Tickets</Typography>
        </Box>
      </Paper>
      <Grid container spacing={6} mb={'20px'}>
        <Grid
          item
          xs={12}
          sm={3}
          onClick={() => {
            router.push({
              pathname: '/view-tickets',
              query: { status: TicketStatus.NOT_STARTED_YET }
            })
          }}
          sx={{ cursor: 'pointer' }}
        >
          <SimpleCard
            count={statusCounts?.[TicketStatus.NOT_STARTED_YET]}
            icon={'circum:no-waiting-sign'}
            text={'Not Started Yet'}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          onClick={() => {
            router.push({
              pathname: '/view-tickets',
              query: { status: TicketStatus.PENDING }
            })
          }}
          sx={{ cursor: 'pointer' }}
        >
          <SimpleCard
            count={statusCounts?.[TicketStatus.PENDING]}
            icon={'ic:outline-pending-actions'}
            text={'Pending'}
            iconColor='warning'
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          onClick={() => {
            router.push({
              pathname: '/view-tickets',
              query: { status: TicketStatus.IN_PROGRESS }
            })
          }}
          sx={{ cursor: 'pointer' }}
        >
          <SimpleCard
            count={statusCounts?.[TicketStatus.IN_PROGRESS]}
            icon={'carbon:in-progress'}
            text={'In Progress'}
            iconColor='info'
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          onClick={() => {
            router.push({
              pathname: '/view-tickets',
              query: { status: TicketStatus.COMPLETED }
            })
          }}
          sx={{ cursor: 'pointer' }}
        >
          <SimpleCard
            count={statusCounts?.[TicketStatus.COMPLETED]}
            icon={'fluent-mdl2:completed'}
            text={'Completed'}
            iconColor='success'
          />
        </Grid>
      </Grid>
    </>
  )
}

export default BusinessTicketCards
