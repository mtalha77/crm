import { Grid, Typography } from '@mui/material'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function DesignerView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>Work Status:</BoldText> {data?.work_status}
      </Grid>{' '}
      <Grid item xs={6}>
        <BoldText>Task Details:</BoldText> {data?.task_details}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
    </Grid>
  )
}

export default DesignerView
