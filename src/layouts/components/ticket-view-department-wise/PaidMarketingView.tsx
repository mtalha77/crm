import { Grid, Typography } from '@mui/material'
import React from 'react'
import { PaidMarketingWorkStatus } from 'src/shared/enums/WorkStatusType.enum'
const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function PaidMarketingView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>Work Status:</BoldText> {data?.work_status}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Service Name:</BoldText> {data?.service_name}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Service Location:</BoldText> {data?.service_location}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Ad Account Access:</BoldText> {data?.ad_account_access}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Budget:</BoldText> {data?.budget}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Budget Price:</BoldText> {data?.budget_price}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Client Objective:</BoldText> {data?.clients_objectives}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
      {data.work_status === PaidMarketingWorkStatus.OTHERS && (
        <Grid item xs={6}>
          <BoldText>Platform Name:</BoldText> {data?.platform_name}
        </Grid>
      )}
    </Grid>
  )
}

export default PaidMarketingView
