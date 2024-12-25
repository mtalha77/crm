import { Typography } from '@mui/material'
import EmailLogsTable from 'src/layouts/components/tables/emailLogsTable'

function ViewTickets() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Email Logs Table
      </Typography>
      <EmailLogsTable />
    </>
  )
}

export default ViewTickets
