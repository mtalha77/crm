// ** MUI Imports
import { Grid, Icon } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
// Icon
// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [{ data: [0, 20, 5, 30, 15, 45] }]

const BusinessTicketCards = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -15,
        left: -7,
        right: 7,
        bottom: -15
      }
    },
    stroke: { width: 3 },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 6,
      offsetY: 2,
      offsetX: -1,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 6,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1
        }
      ],
      hover: { size: 7 }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }
  const textColor = theme.palette.mode === 'dark' ? 'common.white' : 'common.black'

  return (
    <>
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          mb: 2.75,
          mt: 2.75,
          justifyContent: 'center',
          alignItems: 'center',
          color: textColor,
          '& svg': { mr: 2.5 }
        }}
      >
        Business Tickets
      </Typography>
      <Grid container spacing={6} mb={'20px'}>
        <Grid item xs={4}>
          <Card sx={{ ml: '20px', mt: '20px', pt: '20px', pb: '20px', border: 0, color: 'common.white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  22k
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
                  <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
                    +15%
                  </Typography>
                  <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
                </Box>
              </Box>
              <Typography variant='body2' color={textColor}>
                Open Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ mt: '20px', pt: '20px', pb: '20px', border: 0, color: 'common.white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  22k
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
                  <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
                    +15%
                  </Typography>
                  <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
                </Box>
              </Box>
              <Typography variant='body2' color={textColor}>
                Close Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>{' '}
        <Grid item xs={4}>
          <Card sx={{ mr: '20px', mt: '20px', pt: '20px', pb: '20px', border: 0, color: 'common.white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  22k
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
                  <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
                    +15%
                  </Typography>
                  <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
                </Box>
              </Box>
              <Typography variant='body2' color={textColor}>
                Created Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default BusinessTicketCards
