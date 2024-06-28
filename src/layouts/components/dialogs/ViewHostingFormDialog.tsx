// ** React Imports
import { ReactElement, Ref, forwardRef } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FadeProps } from '@mui/material/Fade'
import { Slide } from '@mui/material'
import Icon from 'src/@core/components/icon'
import ViewFullHostingFormDetails from '../ViewFullHostingFormDetails'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ViewHostingFormDialog = ({ _id, open, onClose }: any) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition} onBackdropClick={onClose}>
      <DialogContent
        sx={{
          backgroundColor: '#282A42',
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <ViewFullHostingFormDetails id={_id} />
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
  )
}

export default ViewHostingFormDialog
