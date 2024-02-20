import { Typography } from '@mui/material'
import React from 'react'
import BusinessTicketsTable from 'src/layouts/components/tables/businessTicketsTable'

function ViewTickets() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Business Tickets Table
      </Typography>
      <BusinessTicketsTable />
    </>
  )
}

export default ViewTickets
