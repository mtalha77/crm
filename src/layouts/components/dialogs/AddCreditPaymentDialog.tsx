import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'

export default function AddCreditPaymentDialog({ session, pushNewPaymentInPaymentHistories }: any) {
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = React.useState<number | null>(null)
  const [apiLoading, setApiLoading] = React.useState(false)
  const regex = /^[0-9]+$/
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e: any) => {
    if (!e.target.value) {
      setAmount(e.target.value)
      return
    }
    if (!regex.test(e.target.value)) return
    setAmount(Number(e.target.value))
  }

  const handleSubmit = async () => {
    try {
      // const remaining_amount =
      setApiLoading(true)
      const res = await axios.patch(
        `/api/business-ticket/add-credit-payment`,
        {
          received_amount: amount,
          id: session._id,
          total_payment: session.total_payment,
          session_remaining_amount: session.remaining_payment
        },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      setApiLoading(false)
      setOpen(false)

      pushNewPaymentInPaymentHistories(res.data.payload.paymentHistory, res.data.payload.session)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen} sx={{ mb: 10 }}>
        Add Received payment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Received Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='amount'
            label='Received Amount'
            type='text'
            fullWidth
            onChange={handleChange}
            value={amount}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
