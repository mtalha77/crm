// ** MUI Imports
import { Grid, Paper } from '@mui/material'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import SimpleCard from '../cards/simpleCard'

const DepartmentalTicketCards = () => {
  // ** Hook
  const [statusCounts, setStatusCounts] = useState()

  useEffect(() => {
    const temp = async () => {
      await axios
        .post(
          '/api/department-ticket/get-analytics',
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
    }
    temp()
  }, [])

  return (
    <>
      <Paper sx={{ mt: 8, mb: 6 }}>
        <Box textAlign={'center'} padding={3}>
          <Typography variant='h4'> Departmental Tickets</Typography>
        </Box>
      </Paper>
      <Grid container spacing={6} mb={'20px'}>
        <Grid item xs={12} sm={3}>
          <SimpleCard
            count={statusCounts?.[TicketStatus.NOT_STARTED_YET]}
            icon={'circum:no-waiting-sign'}
            text={'Not Started Yet'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SimpleCard
            count={statusCounts?.[TicketStatus.PENDING]}
            icon={'ic:outline-pending-actions'}
            text={'Pending'}
            iconColor='warning'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SimpleCard
            count={statusCounts?.[TicketStatus.IN_PROGRESS]}
            icon={'carbon:in-progress'}
            text={'In Progress'}
            iconColor='info'
          />
        </Grid>

        <Grid item xs={12} sm={3}>
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

export default DepartmentalTicketCards
