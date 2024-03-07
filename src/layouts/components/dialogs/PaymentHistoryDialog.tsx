// ** React Imports
import { ReactElement, Ref, forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FadeProps } from '@mui/material/Fade'

import { Slide } from '@mui/material'
import Icon from 'src/@core/components/icon'
import AddNewPayment from '../AddNewPayment'
import SinglePaymentHistory from '../singlePaymentHistory'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const PaymentHistoryDialog = (props: any) => {
  // ** States

  const [show, setShow] = useState<boolean>(false)
  const { payment_history, ticketId, fetchAgain } = props

  return (
    <>
      <Button variant='contained' onClick={() => setShow(true)} size='small' sx={{ textTransform: 'none' }}>
        Payment history
      </Button>
      <Dialog
        fullScreen
        open={show}
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
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
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Recurring Payment
            </Typography>
          </Box>
          <AddNewPayment ticketId={ticketId} fetchAgain={fetchAgain} setShow={setShow} />
          <Box sx={{ textAlign: 'center', mt: '50px' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Payment History
            </Typography>
          </Box>

          {payment_history.map((p: any, index: number) => {
            return <SinglePaymentHistory key={index} payment={p} ticketId={ticketId} fetchAgain={fetchAgain} />
          })}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        ></DialogActions>
      </Dialog>
    </>
  )
}

export default PaymentHistoryDialog
