'use client'

// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
  read: boolean
} & (
  | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
)
interface Props {
  settings: Settings
  unreadMessages: any
  unreadMessagesIds: string[]
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 344
})

// ** Styled Avatar component

// const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
//   width: 38,
//   height: 38,
//   fontSize: '1.125rem'
// })

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'break-spaces',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const ChatMsgNotificationDropdown = (props: Props) => {
  // ** Props
  const { settings, unreadMessages, unreadMessagesIds } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const router = useRouter()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = async (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
    try {
      if (unreadMessagesIds.length === 0) return

    } catch (error) {
      console.log(error)
    }
  }

  const updateMsgReadStatus = async (messageId, businessTicketsId) => {
    try {
      await axios.post(
        '/api/user/update-msg-read-status',
        {
          messageId,
          businessTicketsId
        },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const openChatBox = async (messageId: string, businessTicketsId: string) => {

    if (businessTicketsId) {
      router.push(`/ticket-comments/${businessTicketsId}`)
      handleDropdownClose()
      updateMsgReadStatus(messageId, businessTicketsId)
    }
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  // const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
  //   const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

  //   if (avatarImg) {
  //     return <Avatar alt={avatarAlt} src={avatarImg} />
  //   } else if (avatarIcon) {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {avatarIcon}
  //       </Avatar>
  //     )
  //   } else {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {getInitials(avatarText as string)}
  //       </Avatar>
  //     )
  //   }
  // }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={!unreadMessagesIds.length}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon icon='hugeicons:message-notification-01' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Messages</Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={`${unreadMessagesIds.length} New`}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {unreadMessages.map((msg, index: number) => (
            <MenuItem
              key={index}
              onClick={() => openChatBox(msg.messageId, msg.businessTicketsId)}

              // sx={{ backgroundColor: notification.read ? '' : '#d9dafc' }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {/* <RenderAvatar notification={notification} /> */}
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{msg.sender}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>
                    {msg.business_name} with {msg.work_status}
                  </MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {msg.date}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>

        {/* <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem> */}
      </Menu>
    </Fragment>
  )
}

export default ChatMsgNotificationDropdown
