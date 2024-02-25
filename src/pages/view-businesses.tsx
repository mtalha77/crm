import { Typography } from '@mui/material'
import React from 'react'
import BusinessesTable from 'src/layouts/components/tables/businessesTable'

function ViewBusinesses() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Businesses Table
      </Typography>

      <BusinessesTable />
    </>
  )
}

export default ViewBusinesses
