import { Grid, Typography } from '@mui/material'
import { WebSeoWorkStatus } from 'src/shared/enums/WorkStatusType.enum'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function WebSeoView({ data }: any) {
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
        <BoldText>Keywords:</BoldText> {data?.key_words}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Login Credentials:</BoldText> {data?.login_credentials}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Console Access:</BoldText> {data?.console_access}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Analytic Access:</BoldText> {data?.analytics_access}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
      {(data.work_status === WebSeoWorkStatus.BACK_LINKS || data.work_status === WebSeoWorkStatus.EXTRA_LINKS) && (
        <Grid item xs={6}>
          <BoldText>No Of Backlinks:</BoldText> {data?.no_of_backlinks}
        </Grid>
      )}
      {data.work_status === WebSeoWorkStatus.PAID_GUEST_POSTING && (
        <Grid item xs={6}>
          <BoldText>No Of Posts:</BoldText> {data?.no_of_posts}
        </Grid>
      )}

      {data.work_status === WebSeoWorkStatus.MONTHLY_SEO && (
        <Grid item xs={6}>
          <BoldText>No Of Blogs:</BoldText> {data?.no_of_blogs}
        </Grid>
      )}
    </Grid>
  )
}

export default WebSeoView
