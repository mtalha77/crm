import { Typography } from '@mui/material'
import React from 'react'
import CloserCommissionTable from 'src/layouts/components/tables/CloserCommissionTable'

function CloserCommission() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Closer Commission Table
      </Typography>

      <CloserCommissionTable />
    </>
  )
}

export default CloserCommission
