import { Typography } from '@mui/material'
import React from 'react'
import FronterCommissionTable from 'src/layouts/components/tables/FronterCommissionTable'

function FronterCommission() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Fronter Commission Table
      </Typography>

      <FronterCommissionTable />
    </>
  )
}

export default FronterCommission
