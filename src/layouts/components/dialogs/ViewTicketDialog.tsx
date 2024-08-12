import { ReactElement, Ref, forwardRef, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FadeProps } from '@mui/material/Fade'
import { Slide, Tooltip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Icon from 'src/@core/components/icon'
import ViewFullDepartmentalTicketDetails from '../ViewFullDepartmentalTicketDetails'
import ViewFullTicketDetails from '../ViewFullTicketDetails'

// Transition for the Dialog component
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface ViewTicketDialogProps {
  ticketId: string
  depart: string
  departmentalTicket?: boolean
  openDirectly?: boolean // Optional prop to open the dialog directly
}

const ViewTicketDialog = ({
  ticketId,
  depart,
  departmentalTicket = false,
  openDirectly = false
}: ViewTicketDialogProps) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (openDirectly) {
      setShow(true)
    }

    console.log('starting: ' + show)

    return () => {
      setShow(false)
      console.log('ending: ' + show)
    }
  }, [openDirectly, ticketId])

  const handleClose = () => {
    setShow(false)
    console.log('on close: ' + show)
  }

  return (
    <>
      {!openDirectly && (
        <Tooltip title='View'>
          <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setShow(true)} />
        </Tooltip>
      )}

      <Dialog fullScreen open={show} onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent
          sx={{
            backgroundColor: '#282A42',
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          {/* Display ticket details based on the departmentalTicket flag */}
          {departmentalTicket ? (
            <ViewFullDepartmentalTicketDetails ticketId={ticketId} depart={depart} />
          ) : (
            <ViewFullTicketDetails ticketId={ticketId} depart={depart} />
          )}
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: '#282A42',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        />
      </Dialog>
    </>
  )
}

export default ViewTicketDialog
