import { Grid, Typography } from '@mui/material'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function WordPressView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>SubCategories:</BoldText> {data?.work_status}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Service Name:</BoldText> {data?.service_name}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Service Area:</BoldText> {data?.service_area}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Referral Website:</BoldText> {data?.referral_website}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
    </Grid>
  )
}

export default WordPressView
