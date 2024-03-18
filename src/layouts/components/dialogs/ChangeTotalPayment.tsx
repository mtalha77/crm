import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'

export default function ChangeTotalPaymentDialog({ session, handleChangeTotalPayment }: any) {
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = React.useState<number | null>(null)
  const [, setApiLoading] = React.useState(false)
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
      setApiLoading(true)
      const res = await axios.patch(
        `/api/accounting/update-total-payment`,
        {
          total_amount: amount,
          id: session._id
        },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      setApiLoading(false)
      setOpen(false)

      handleChangeTotalPayment(res.data.payload.paymentHistory, res.data.payload.session)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen} sx={{ mb: 10 }}>
        Update Total Payment
      </Button>
      <Dialog open={open} onClose={handleClose} keepMounted={false}>
        <DialogTitle>Update Total Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='amount'
            label='Enter Total Payment'
            type='text'
            fullWidth
            onChange={handleChange}
            value={amount}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit}>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
