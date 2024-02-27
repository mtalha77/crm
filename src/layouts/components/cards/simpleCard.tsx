import { Box, Card, CardContent, Skeleton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

function SimpleCard({ count, icon, loading, text, iconColor }: any) {
  const theme = useTheme()

  const textColor = theme.palette.mode === 'dark' ? 'common.white' : 'common.black'
  if (loading)
    return (
      <>
        <Skeleton width={'100%'} height={'100%'} />
      </>
    )
  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} mb='20px'>
            <Typography variant='h5' sx={{ mr: 1.75 }}>
              {count || 0}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary' } }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }} color={iconColor}>
                <Icon icon={icon} fontSize='30px' />
              </CustomAvatar>
            </Box>
          </Box>
          <Typography variant='body2' color={textColor}>
            {text || ''}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default SimpleCard
