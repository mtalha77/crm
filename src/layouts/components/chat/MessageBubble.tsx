import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

const BubbleContainer = styled(Box)(({ theme, owner }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: owner ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2)
}))

const Bubble = styled(Box)(({ theme, owner }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '12%',
  padding: theme.spacing(2, 5),
  borderRadius: '10px',
  backgroundColor: owner ? theme.palette.primary.main : theme.palette.grey[800],
  color: owner ? theme.palette.primary.contrastText : theme.palette.text.primary,
  position: 'relative',
  maxWidth: '75%'
}))

const SenderName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
  color: 'blue'
}))

const Timestamp = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(0.5),
  right: theme.spacing(0.5),
  fontSize: '0.65rem',
  color: 'white',
  padding: theme.spacing(1)
}))

const MessageBubble = ({ message, owner, senderName, timestamp }) => {



  return (
    <BubbleContainer owner={owner}>
      <Bubble owner={owner} display='flex' flexDirection='column'>
        <SenderName variant='body2'>{owner? 'You' : senderName}</SenderName>
        <Typography variant='body2' gutterBottom color={'white'}>
          {message}
        </Typography>
        <Timestamp variant='caption'>{dayjs(timestamp).format('h:mm A')}</Timestamp>
      </Bubble>
    </BubbleContainer>
  )
}

export default MessageBubble
