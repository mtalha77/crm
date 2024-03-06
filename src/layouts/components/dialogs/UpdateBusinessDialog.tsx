// ** React Imports

import { ReactElement, Ref, forwardRef, useState } from 'react'

// ** MUI Imports

import Dialog from '@mui/material/Dialog'

import IconButton from '@mui/material/IconButton'

import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FadeProps } from '@mui/material/Fade'

import Icon from 'src/@core/components/icon'

import EditIcon from '@mui/icons-material/Edit'
import { Icon as MuiIcon, Slide, Tooltip } from '@mui/material'
import BusinessUpdate from 'src/layouts/components/business-update'

// const BoldText = ({ children }: any) => (
//   <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
//     {children}
//   </Typography>
// )

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const UpdateBusinessDialog = (props: any) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const { id } = props

  return (
    <>
      <Tooltip title='Update'>
        <MuiIcon
          style={{ marginLeft: 15, cursor: 'pointer' }}
          onClick={() => {
            setShow(true)
          }}
        >
          <EditIcon />
        </MuiIcon>
      </Tooltip>
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

          <BusinessUpdate businessId={id} setShow={setShow} />
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

export default UpdateBusinessDialog
