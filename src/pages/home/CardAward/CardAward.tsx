// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Styled component for the trophy image
const TrophyImg = styled('img')(({ theme }) => ({
  right: 22,
  bottom: 0,
  width: 106,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 95
  }
}))

const CardAward = () => {
  return (
    <Card sx={{ position: 'relative' }} style={{ marginTop: '20px' }}>
      <CardContent>
        <Typography variant='h6'>
          Congratulations{' '}
          <Box component='span' sx={{ fontWeight: 'bold' }}>
            Norris
          </Box>
          ! 🎉
        </Typography>
        <Typography variant='body2' sx={{ mb: 4 }}>
          {`Best seller of the month (this card will show when sales manager close month, the month can be closed on any date of month)`}
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: 600, color: 'primary.main' }}>
          $42.8k
        </Typography>
        <Typography variant='body2' sx={{ mb: 4 }}>
          78% of target 🤟🏻
        </Typography>
        <Button size='small' variant='contained'>
          View Sales
        </Button>
        <TrophyImg alt='trophy' src='/images/pages/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default CardAward
