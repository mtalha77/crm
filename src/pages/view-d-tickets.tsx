import { Typography } from '@mui/material'
import DepartmentalTicketsTable from 'src/layouts/components/tables/DepartmentalTicketsTable'

function ViewTickets() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Departmental Tickets Table
      </Typography>
      <DepartmentalTicketsTable />
    </>
  )
}

export default ViewTickets
