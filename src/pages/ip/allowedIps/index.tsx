import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'

const IpFormWrapper = styled(Box)(({ theme }) => ({
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

const IpListWrapper = styled('div')({
  overflowY: 'auto',
  padding: 8,
  marginTop: 80,

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

const Bubble = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '12%',
  padding: theme.spacing(2, 5),
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.07)',
  color: theme.palette.text.primary,
  position: 'relative',
  maxWidth: '100%',
  marginTop: '10px',
  '& button': {
    marginLeft: theme.spacing(1)
  }
}))

const DeleteButton = styled(Button)(({}) => ({
  color: '#d32f2f',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
    transform: 'scale(1.1)'
  }
}))

const UpdateButton = styled(Button)(() => ({
  color: '#388e3c',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
    transform: 'scale(1.1)'
  }
}))

function IpList() {
  const [newIp, setNewIp] = useState<string>('')
  const [allowedIPs, setAllowedIPs] = useState<any[]>([])
  const [editMode, setEditMode] = useState<{ id: string | null; ip: string | null }>({ id: null, ip: null })
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const ipListRef = useRef<HTMLElement>(null)

  function isValidIP(address: string): boolean {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/

    return ipv4Pattern.test(address) || ipv6Pattern.test(address)
  }

  const addNewIpAddress = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!isValidIP(newIp)) {
      toast.error('Invalid IP Address')

      return
    }
    if (editMode.id) {
      // Update existing IP
      try {
        await axios.post(
          `/api/ip/update`,
          { id: editMode.id, newIp },
          { headers: { authorization: localStorage.getItem('token') } }
        )
        toast.success('IP updated successfully')
        setEditMode({ id: null, ip: null }) // Exit edit mode
      } catch (error: any) {
        console.log(error)
        toast.error(error.response.data)
      }
    } else {
      // Add new IP
      try {
        await axios.post('/api/ip/add', { newIp }, { headers: { authorization: localStorage.getItem('token') } })
        toast.success('IP added successfully')
      } catch (error: any) {
        console.log(error)
        toast.error(error.response.data)
      }
    }
    setNewIp('')
    fetchIpList() // Refresh IP list
  }

  const deleteIpAddress = async (id: string) => {
    try {
      await axios.post(`/api/ip/delete`, { id }, { headers: { authorization: localStorage.getItem('token') } })
      toast.success('IP deleted successfully')
      fetchIpList() // Refresh IP list
      handleCloseDialog()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data)
    }
  }

  const handleOpenDialog = (id: string) => {
    setDeleteId(id)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setDeleteId(null)
    setOpenDialog(false)
  }

  const startEditing = (id: string, ip: string) => {
    setEditMode({ id, ip })
    setNewIp(ip)
  }

  const fetchIpList = async () => {
    try {
      const res = await axios.get('/api/ip/get-all', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setAllowedIPs(res?.data?.payload?.allowedIPs || [])
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    fetchIpList()
  }, [])

  return (
    <>
      <Container sx={{ height: '85vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <IpListWrapper ref={ipListRef}>
          <Typography variant='h4' sx={{ mb: 5 }}>
            Allowed IPs
          </Typography>
          {allowedIPs.map(({ _id, ip }) => (
            <div key={_id}>
              <Bubble>
                <Typography variant='body1'>{ip}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DeleteButton variant='contained' onClick={() => handleOpenDialog(_id)}>
                    <Icon icon={'mdi:delete-outline'} width={24} height={24} />
                  </DeleteButton>
                  <UpdateButton variant='contained' onClick={() => startEditing(_id, ip)}>
                    <Icon icon={'mdi:edit-outline'} width={24} height={24} />
                  </UpdateButton>
                </Box>
              </Bubble>
            </div>
          ))}
        </IpListWrapper>

        <Form onSubmit={addNewIpAddress} sx={{ position: 'absolute', top: '.5%', width: '100%' }}>
          <IpFormWrapper>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                value={newIp}
                size='small'
                placeholder='Type IP Address'
                onChange={e => setNewIp(e.target.value)}
                sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button type='submit' variant='contained'>
                {editMode.id ? 'Update' : 'Add'}
              </Button>
            </Box>
          </IpFormWrapper>
        </Form>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this IP?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => deleteIpAddress(deleteId!)} color='secondary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IpList
