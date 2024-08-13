// ** React Imports
import { useState, SyntheticEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Types
import { SendMsgComponentType } from 'src/types/apps/chatTypes'
import { Container, Divider } from '@mui/material'

// ** others
import MessageBubble from 'src/layouts/components/chat/MessageBubble'
import axios from 'axios'
import toast from 'react-hot-toast'

import dayjs from 'dayjs'

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: 8,
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const ChatHistory = styled('div')({
  overflowY: 'auto',
  padding: 8,
  marginBottom: 80,

  // WebKit Browsers
  '::-webkit-scrollbar': {
    width: '12px'
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    borderRadius: '84px'
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '84px'
  },

  // Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: '#8866 transparent'
})

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const SendMsgForm = (props: SendMsgComponentType) => {
  // ** Props
  // const { store, dispatch, sendMsg } = props

  // ** State
  const [msg, setMsg] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<any>([])
  const router = useRouter()
  const { id } = router.query
  const [loggedInUserId, setLoggedInUserId] = useState<any>('')
  const chatHistoryRef = useRef<HTMLElement>(null)

  const groupMessagesByDate = (chatHistory: any) => {
    const groups: any = {}

    chatHistory.forEach((message: any) => {
      const date = dayjs(message.createdAt).format('DD-MM-YYYY') // Get the 'YYYY-MM-DD' part of the date
      console.log('date: ', date)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })

    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages
    }))
  }

  const getChatHistory = async () => {
    try {
      const res = await axios.post(
        `/api/business-ticket/chat/get-chat-history`,
        { businessTicketId: id },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )

      const chatHistory = res.data.payload.chatHistory
      setLoggedInUserId(res.data.payload.loggedInUserId)

      if (chatHistory) {
        console.log('chatHistory: ', chatHistory)
        const groupedChatHistory = groupMessagesByDate(chatHistory)
        console.log('groupedChatHistory: ', groupedChatHistory)

        // groupedChatHistory.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1);
        setChatHistory(groupedChatHistory)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to get chat history')
    }
  }

  const handleSendMsg = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      // Send message to the server
      const res = await axios.post(
        '/api/business-ticket/chat/send-message',
        { businessTicketId: id, content: msg },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )

      const newMessage = res.data.payload.newMessage

      console.log('newMessage', newMessage)

      // setChatHistory(prevState => [...prevState, newMessage])

      getChatHistory()

      setMsg('')
    } catch (error) {
      console.log(error)
      toast.error('Failed to send message')
    }
  }

  useEffect(() => {
    getChatHistory()
  }, [])

  useEffect(() => {
    const chatHistory = chatHistoryRef.current
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight
    }

    window.scrollTo(0, document.body.scrollHeight)
    document.body.style.overflow = 'hidden'

    // Restore scrollbar when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [handleSendMsg])

  return (
    <Container sx={{ height: '85vh', display: 'flex', flexDirection: 'column', position:'relative' }}>
      <ChatHistory ref={chatHistoryRef}>
        {chatHistory.map(history => (
          <>
            <Typography variant='caption' component={'h1'} color='textSecondary' sx={{ textAlign: 'center', my: 3 }}>
              {history.date}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {history.messages.map(msg => (
              <MessageBubble
                key={msg._id}
                message={msg.content}
                owner={msg.sender._id === loggedInUserId}
                senderName={msg.sender.user_name}
                timestamp={msg.createdAt}
              />
            ))}
          </>
        ))}
      </ChatHistory>

      <Form onSubmit={handleSendMsg} sx={{position:'absolute', bottom: '.5%', width:'100%'}}>
        <ChatFormWrapper>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={msg}
              size='small'
              placeholder='Type your message here…'
              onChange={e => setMsg(e.target.value)}
              sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <IconButton size='small' sx={{ mr: 1.5, color: 'text.primary' }}>
            <Icon icon='mdi:microphone' fontSize='1.375rem' />
          </IconButton> */}
            {/* <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
            <Icon icon='mdi:attachment' fontSize='1.375rem' />
            <input hidden type='file' id='upload-img' />
          </IconButton> */}
            <Button type='submit' variant='contained'>
              Send
            </Button>
          </Box>
        </ChatFormWrapper>
      </Form>
    </Container>
  )
}

export default SendMsgForm
