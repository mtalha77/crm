import { Typography } from '@mui/material'
import CrmLogsTable from 'src/layouts/components/tables/crmLogsTable'

function CrmLogs() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        CRM Logs
      </Typography>
      <CrmLogsTable />
    </>
  )
}

export default CrmLogs
