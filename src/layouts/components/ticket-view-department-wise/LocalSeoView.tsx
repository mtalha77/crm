import { Grid, Typography } from '@mui/material'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function LocalSeoView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>Work Status:</BoldText> {data?.work_status}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Gmb Access Email:</BoldText> {data?.gmb_access_email}
      </Grid>{' '}
      <Grid item xs={6}>
        <BoldText>Services Name:</BoldText> {data?.service_name}
      </Grid>{' '}
      <Grid item xs={6}>
        <BoldText>Services Areas:</BoldText> {data?.service_area}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
    </Grid>
  )
}

export default LocalSeoView
