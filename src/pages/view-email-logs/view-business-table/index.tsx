import { Typography } from '@mui/material'
import React from 'react'
import EmailBusinessesTable from 'src/layouts/components/tables/emailTable'

function BusinessesEmail() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Email Table
      </Typography>

      <EmailBusinessesTable />
    </>
  )
}

export default BusinessesEmail
