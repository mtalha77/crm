import { Grid, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
function SinglePaymentHistory(props: any) {
  const { payment } = props
  return (
    <>
      <Grid item xs={12}>
        <Typography>Creation Date : {moment(payment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Typography>Total Payment : {payment.total_payment} </Typography>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Typography>Advance Payment : {payment.advance_payment} </Typography>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Typography>Remaining Payment : {payment.remaining_payment} </Typography>
      </Grid>
    </>
  )
}

export default SinglePaymentHistory
