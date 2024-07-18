// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { NotificationType } from 'src/shared/enums/NotificationType.enum'
import moment from 'moment'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

// const notifications: NotificationsType[] = [
//   {
//     meta: 'Today',
//     avatarAlt: 'Flora',
//     title: 'Congratulation Flora! 🎉',
//     avatarImg: '/images/avatars/4.png',
//     subtitle: 'Won the monthly best seller badge'
//   },
//   {
//     meta: 'Yesterday',
//     avatarColor: 'primary',
//     subtitle: '5 hours ago',
//     avatarText: 'Robert Austin',
//     title: 'New user registered.'
//   },
//   {
//     meta: '11 Aug',
//     avatarAlt: 'message',
//     title: 'New message received 👋🏻',
//     avatarImg: '/images/avatars/5.png',
//     subtitle: 'You have 10 unread messages'
//   },
//   {
//     meta: '25 May',
//     title: 'Paypal',
//     avatarAlt: 'paypal',
//     subtitle: 'Received Payment',
//     avatarImg: '/images/misc/paypal.png'
//   },
//   {
//     meta: '19 Mar',
//     avatarAlt: 'order',
//     title: 'Received Order 📦',
//     avatarImg: '/images/avatars/3.png',
//     subtitle: 'New order received from John'
//   },
//   {
//     meta: '27 Dec',
//     avatarAlt: 'chart',
//     subtitle: '25 hrs ago',
//     avatarImg: '/images/misc/chart.png',
//     title: 'Finance report has been generated'
//   }
// ]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { user } = useAuth()

  const [notifications, setNotifications] = useState<NotificationsType[]>([])

  const [newNotificationsIds, setNewNotificationsIds] = useState<string[]>([])

  const getTitle = (type: NotificationType) => {
    switch (type) {
      case NotificationType.TICKET_ASSIGNED:
        return 'Ticket Assignment'

      case NotificationType.CLIENT_REPORTING_DATE:
        return 'Client Reporting Date Reached'

      case NotificationType.REMAINING_PRICE_DATE:
        return 'Remaining Price Date Reached'

      case NotificationType.CLIENT_REPORTING_DATE_7_DAYS_PASSED:
        return 'Client Reporting Date Passed'

      default:
        break
    }
  }

  const fetchNotification = async () => {
    try {
      const res = await axios.post(
        '/api/user/get-notifications',
        {},
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      const data = res.data.payload.notifications
      const arr: string[] = []
      const newState: NotificationsType[] = data.map((d: any) => {
        if (d.read === false) arr.push(d._id)

        return {
          meta: moment(d.createdAt).format('D MMM'),
          avatarAlt: user?.user_name,
          title: getTitle(d.type),
          avatarImg: 'dsa',
          subtitle: d.message,
          read: d.read
        }
      })
      setNewNotificationsIds(arr)
      setNotifications(newState)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchNotification()
  }, [])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}

        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationDropdown
          settings={settings}
          notifications={notifications}
          newNotificationsIds={newNotificationsIds}
        />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
