import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AddNewPayment from 'src/layouts/components/AddNewPayment'
import ViewPaymentHistories from 'src/layouts/components/ViewPaymentHistories'

function ViewPaymentHistory() {
  return (
    <>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
          Add Recurring Payment
        </Typography>
      </Box>
      <AddNewPayment />
      <Box sx={{ textAlign: 'center', mt: '50px' }}>
        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
          Payment History
        </Typography>
        <ViewPaymentHistories />
      </Box>
    </>
  )
}

export default ViewPaymentHistory
