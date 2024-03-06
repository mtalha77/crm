import { Grid, Typography } from '@mui/material'
import { SocialMediaWorkStatus } from 'src/shared/enums/WorkStatusType.enum'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
function SocialMediaView({ data }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <BoldText>Work Status:</BoldText> {data?.work_status}
      </Grid>
      <Grid item xs={6}>
        <BoldText>Service Name:</BoldText> {data?.service_name}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Facebook Url:</BoldText> {data?.facebook_url}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Login Credentials:</BoldText> {data?.login_credentials}
      </Grid>

      <Grid item xs={6}>
        <BoldText>Notes:</BoldText> {data?.notes}
      </Grid>
      {(data.work_status === SocialMediaWorkStatus.NO_OF_REVIEWS ||
        data.work_status === SocialMediaWorkStatus.LIKES_FOLLOWERS ||
        data.work_status === SocialMediaWorkStatus.OTHERS_POSTING) && (
        <Grid item xs={6}>
          <BoldText>Platform Name:</BoldText> {data?.platform_name}
        </Grid>
      )}

      {data.work_status === SocialMediaWorkStatus.LIKES_FOLLOWERS && (
        <Grid item xs={6}>
          <BoldText>No Of Likes:</BoldText> {data?.no_of_likes}
        </Grid>
      )}

      {data.work_status === SocialMediaWorkStatus.NO_OF_GMB_REVIEWS && (
        <Grid item xs={6}>
          <BoldText>No Of Gmb Reviews:</BoldText> {data?.no_of_gmb_reviews}
        </Grid>
      )}

      {(data.work_status === SocialMediaWorkStatus.FACEBOOK_POSTING ||
        data.work_status === SocialMediaWorkStatus.INSTAGRAM_POSTING ||
        data.work_status === SocialMediaWorkStatus.OTHERS_POSTING) && (
        <Grid item xs={6}>
          <BoldText>No Of Posts:</BoldText> {data?.no_of_posts}
        </Grid>
      )}
    </Grid>
  )
}

export default SocialMediaView
