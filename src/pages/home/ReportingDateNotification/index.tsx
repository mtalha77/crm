// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import ListStickySubheader from './list-sticky-subheader/ListStickySubheader'

const ReportingDateNotification = () => {
  const theme = useTheme()
  const textColor = theme.palette.mode === 'dark' ? 'common.white' : 'common.black'

  return (
    <Grid className='match-height' container spacing={6} mb='30px'>
      {/* <Grid item xs={12} md={6}> */}
      <Grid item xs={12}>
        <Card sx={{ mt: '20px', pb: '20px', border: 0, color: 'common.white' }} title='Client Reporting Date Alerts'>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography
              variant='h4'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '16px',
                mb: 3,
                color: textColor,
                '& svg': { mr: 2.5 }
              }}
            >
              Client Reporting Date Alerts
            </Typography>
            <ListStickySubheader />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ReportingDateNotification
