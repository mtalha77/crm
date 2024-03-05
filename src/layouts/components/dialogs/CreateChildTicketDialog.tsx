// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'

import Typography from '@mui/material/Typography'

import { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Icon from 'src/@core/components/icon'

import { Slide, Tooltip, Icon as MuiIcon, Card, CardHeader, Divider, CardContent } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import BusinessUpdate from 'src/layouts/components/business-update'
import CreateChildTicket from '../ChildTicket/CreateChildTicket'
import { useRouter } from 'next/router'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CreateChildTicketDialog = (props: any) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const { parentId, businessId, handleEdit } = props
  const router = useRouter()
  const { user } = useAuth()

  return (
    <>
      {/* <MuiIcon
          style={{ marginLeft: 15, cursor: 'pointer' }}
          onClick={() => {
            setShow(true)
            router.replace({
              pathname: router.pathname,
              query: { parentId, businessId }
            })
          }}
        > */}
      <PopupState variant='popover' popupId='demo-popup-menu'>
        {popupState => (
          <React.Fragment>
            <IconButton aria-label='more' id='long-button' aria-haspopup='true'>
              <MoreVertIcon {...bindTrigger(popupState)} />
            </IconButton>

            <Menu {...bindMenu(popupState)}>
              {user?.role !== UserRole.TEAM_LEAD && (
                <MenuItem
                  onClick={() => {
                    popupState.close()
                    handleEdit()
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {user?.role !== UserRole.SALE_EMPLOYEE && user?.role !== UserRole.SALE_MANAGER && (
                <MenuItem
                  onClick={() => {
                    popupState.close()
                    setShow(true)
                    router.replace({
                      pathname: router.pathname,
                      query: { parentId, businessId }
                    })
                  }}
                >
                  Create Linked Ticket
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      {/* </MuiIcon> */}
      <Dialog
        fullScreen
        open={show}
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            backgroundColor: '#282A42',
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <CreateChildTicket setShow={setShow} />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#282A42',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        ></DialogActions>
      </Dialog>
    </>
  )
}

export default CreateChildTicketDialog
