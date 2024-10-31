import { Grid, Typography } from '@mui/material'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)

function WriterView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>Task Details:</BoldText> {data?.task_details}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Total Number:</BoldText> {data?.total_number_for_writers_depart}
      </Grid>{' '}
      <Grid item xs={6}>
        <BoldText>Platform Name:</BoldText> {data?.platform_name}
      </Grid>{' '}
      <Grid item xs={6}>
        <BoldText>Work Status:</BoldText> {data?.work_status}
      </Grid>
      <Grid item xs={6}>
        <BoldText>No. Of Words:</BoldText> {data?.total_number_of_words_writers_depart}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Keywords:</BoldText> {data?.keywords_for_writers_depart}
      </Grid>
    </Grid>
  )
}

export default WriterView
