import { useState, SyntheticEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container, Divider } from '@mui/material'
import MessageBubble from 'src/layouts/components/chat/MessageBubble'
import axios from 'axios'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import FilePreview from '../FilePreview' // Import the FilePreview component
import AttachFileIcon from '@mui/icons-material/AttachFile' // Import the icon

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

  scrollbarWidth: 'thin',
  scrollbarColor: '#8866 transparent'
})

const SendMsgForm = (props: SendMsgComponentType) => {
  const [msg, setMsg] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<any>([])
  const router = useRouter()
  const { id } = router.query
  const [loggedInUserId, setLoggedInUserId] = useState<any>('')
  const chatHistoryRef = useRef<HTMLElement>(null)
  const [files, setFiles] = useState<any[]>([])

  const handleFileChange = e => {
    setFiles([...e.target.files])
  }

  // const handleThumbnailClick = fileUrl => {
  //   window.open(fileUrl)
  // }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const groupMessagesByDate = (chatHistory: any) => {
    const groups: any = {}

    chatHistory.forEach((message: any) => {
      const date = dayjs(message.createdAt).format('DD-MM-YYYY')
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
        const groupedChatHistory = groupMessagesByDate(chatHistory)
        setChatHistory(groupedChatHistory)
      }
    } catch (error) {
      toast.error('Failed to get chat history')
    }
  }

  const handleSendMsg = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (!msg && files.length === 0) {
      return
    }

    const formData = new FormData()
    formData.append('businessTicketId', id)
    formData.append('content', msg)
    files.forEach(file => formData.append('files', file))

    try {
      const res = await axios.post('/api/business-ticket/chat/send-message', formData, {
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })

      await getChatHistory()

      setMsg('')
      setFiles([])
    } catch (error) {
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

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [handleSendMsg])

  return (
    <Container sx={{ height: '85vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ChatHistory ref={chatHistoryRef}>
        {chatHistory.map(history => (
          <>
            <Typography variant='caption' component={'h1'} color='textSecondary' sx={{ textAlign: 'center', my: 3 }}>
              {history.date}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {history.messages.map(msg => (
              <Box key={msg._id} sx={{ mb: 2 }}>
                <MessageBubble
                  message={msg.content}
                  files={msg.files}
                  owner={msg.sender._id === loggedInUserId}
                  senderName={msg.sender.user_name}
                  timestamp={msg.createdAt}
                />
              </Box>
            ))}
          </>
        ))}
      </ChatHistory>

      <Form
        onSubmit={handleSendMsg}
        encType='multipart/form-data'
        sx={{ position: 'absolute', bottom: '.5%', width: '100%' }}
      >
        <ChatFormWrapper>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* File previews */}
            <FilePreview files={files} onRemove={handleRemoveFile} />

            {/* Message input */}
            <TextField
              fullWidth
              value={msg}
              size='small'
              placeholder='Type your message here…'
              onChange={e => setMsg(e.target.value)}
              sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
            />
          </Box>

          {/* Send button and file input */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
              <AttachFileIcon fontSize='inherit' />
              <input
                hidden
                type='file'
                id='upload-img'
                name='files'
                multiple
                accept='.pdf,.docx,.xlsx,.txt'
                onChange={handleFileChange}
              />
            </IconButton>
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
