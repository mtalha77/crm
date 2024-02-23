// import CloseIcon from '@mui/icons-material/Close'
// import AppBar from '@mui/material/AppBar'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import Divider from '@mui/material/Divider'
// import IconButton from '@mui/material/IconButton'
// import List from '@mui/material/List'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemText from '@mui/material/ListItemText'
// import Slide from '@mui/material/Slide'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import { TransitionProps } from '@mui/material/transitions'
// import * as React from 'react'
// import Icon from 'src/@core/components/icon'

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction='up' ref={ref} {...props} />
// })

// export default function FullScreenDialog() {
//   const [open, setOpen] = React.useState(false)
//   const [businessDetailsOpen, setBusinessDetailsOpen] = React.useState(false)
//   const [salePersonsOpen, setSalePersonsOpen] = React.useState(false)
//   const [ticketDetailsOpen, setTicketDetailsOpen] = React.useState(false)
//   const ticketData = {
//     SalesDepart: {
//       closer: 'closer name'
//     },
//     ticketDetails: {
//       priority: 'priority',
//       deadline: 'due_date'
//     },
//     business: {
//       business_name: 'Value 1',
//       business_email: 'Value 2',
//       business_number: 'Value 3',
//       business_hours: 'Value 4',
//       state: 'Value 5',
//       country: 'Value 6',
//       zip_code: 'Value 7',
//       street: 'Value 8',
//       website_url: 'Value 9',
//       gmb_url: 'Value 10',
//       social_profile: 'Value 11',
//       work_status: 'Value 11',
//       notes: 'Value 12'
//     }
//   }
//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleSalePersonsToggle = () => {
//     setSalePersonsOpen(prev => !prev)
//   }

//   const handleDepartmentDetailsToggle = () => {
//     setTicketDetailsOpen(prev => !prev)
//   }
//   const handleBusinessDetailsToggle = () => {
//     setBusinessDetailsOpen(prev => !prev)
//   }

//   return (
//     <React.Fragment>
//       <Button variant='outlined' onClick={handleClickOpen}>
//         Open full-screen dialog
//       </Button>
//       <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div' color='black' textAlign='center'>
//               Ticket Details of "Business Name"
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItemButton
//             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//             onClick={handleDepartmentDetailsToggle}
//           >
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <Icon icon='bxs:message-rounded-detail' style={{ marginRight: '3px', fontSize: '30px' }} />
//               <ListItemText primary='Ticket Details' />
//             </div>
//           </ListItemButton>
//           {ticketDetailsOpen && (
//             <>
//               <Divider />
//               {Object.entries(ticketData.ticketDetails).map(([key, value]) => (
//                 <ListItemButton key={key} style={{ display: 'flex' }}>
//                   <ListItemText primary={`${key} : ${value}`} style={{ textAlign: 'center' }} />
//                 </ListItemButton>
//               ))}{' '}
//             </>
//           )}
//           <ListItemButton
//             onClick={handleSalePersonsToggle}
//             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <Icon icon='foundation:burst-sale' style={{ marginRight: '3px', fontSize: '30px' }} />{' '}
//               <ListItemText primary='Sales Department' />
//             </div>
//           </ListItemButton>
//           {salePersonsOpen && (
//             <>
//               <Divider />
//               {Object.entries(ticketData.SalesDepart).map(([key, value]) => (
//                 <ListItemButton key={key} style={{ display: 'flex' }}>
//                   <ListItemText primary={`${key} : ${value}`} style={{ textAlign: 'center' }} />
//                 </ListItemButton>
//               ))}
//             </>
//           )}

//           <ListItemButton
//             onClick={handleBusinessDetailsToggle}
//             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <Icon icon='mdi:business-card' style={{ marginRight: '3px' }} />{' '}
//               <ListItemText primary='Business Details' />
//             </div>
//           </ListItemButton>

//           {businessDetailsOpen && (
//             <>
//               <Divider />
//               {Object.entries(ticketData.business).map(([key, value]) => (
//                 <ListItemButton key={key} style={{ display: 'flex' }}>
//                   <ListItemText primary={`${key} : ${value}`} style={{ textAlign: 'center' }} />
//                 </ListItemButton>
//               ))}
//             </>
//           )}
//         </List>
//       </Dialog>
//     </React.Fragment>
//   )
// }
// ** React Imports
import { Divider, ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ReactElement, Ref, forwardRef, useState } from 'react'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'

interface DataType {
  name: string
  email: string
  value: string
  avatar: string
}

interface OptionsType {
  name: string
  avatar: string
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TicketDetailsDialogBox = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const ticketData = {
    SalesDepart: {
      closer: 'closer name'
    },
    ticketDetails: {
      priority: 'priority',
      deadline: 'due_date'
    },
    business: {
      business_name: 'Value 1',
      business_email: 'Value 2',
      business_number: 'Value 3',
      business_hours: 'Value 4',
      state: 'Value 5',
      country: 'Value 6',
      zip_code: 'Value 7',
      street: 'Value 8',
      website_url: 'Value 9',
      gmb_url: 'Value 10',
      social_profile: 'Value 11',
      work_status: 'Value 11',
      notes: 'Value 12'
    }
  }
  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 } }}>
        <Icon icon='mdi:file-document-outline' fontSize='2rem' />
        <Typography variant='h6' sx={{ mb: 4 }}>
          Ticket Details for "Business Name"
        </Typography>
        <Typography sx={{ mb: 3 }}>Elegant Share Project modal popup example, easy to use in any page.</Typography>
        <Button variant='contained' onClick={() => setShow(true)}>
          Show
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Ticket Details for "Business Name"
            </Typography>
          </Box>
          <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
            <List dense sx={{ py: 4 }}>
              {/* Sales Department */}
              <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon icon='foundation:burst-sale' style={{ marginRight: '3px', fontSize: '30px' }} /> Sales
                  Department
                </div>
              </Typography>
              <Divider />
              {Object.entries(ticketData.SalesDepart).map(([key, value]) => (
                <ListItem key={key} style={{ textAlign: 'center' }}>
                  <ListItemText primary={`${key}: ${value}`} />
                </ListItem>
              ))}

              {/* Ticket Details */}
              <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon icon='bxs:message-rounded-detail' style={{ marginRight: '3px', fontSize: '25px' }} />
                  Ticket Details
                </div>
              </Typography>
              <Divider />
              {Object.entries(ticketData.ticketDetails).map(([key, value]) => (
                <ListItem key={key} style={{ textAlign: 'center' }}>
                  <ListItemText primary={`${key}: ${value}`} />
                </ListItem>
              ))}
              {/* Business Details */}
              <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon icon='mdi:business-card' style={{ marginRight: '3px', fontSize: '25px' }} />
                  Business Details
                </div>
              </Typography>
              <Divider />
              {Object.entries(ticketData.business).map(([key, value]) => (
                <ListItem key={key} style={{ textAlign: 'center' }}>
                  <ListItemText primary={`${key}: ${value}`} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
              <Icon icon='mdi:account-multiple-outline' fontSize='1.25rem' />
              <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {`Public to ${themeConfig.templateName}`}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default TicketDetailsDialogBox
