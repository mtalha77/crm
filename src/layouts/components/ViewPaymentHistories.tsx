import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AddCreditPaymentDialog from './dialogs/AddCreditPaymentDialog'

function ViewPaymentHistories() {
  const [paymentHistories, setPaymentHistories] = useState<any>([])
  const [paymentSessions, setPaymentSessions] = useState<any>([])
  const router = useRouter()
  const { ticketId } = router.query
  useEffect(() => {
    const getPaymentHistories = async () => {
      try {
        const res = await axios.post(
          '/api/accounting/get-payment-histories',
          { ticketId },
          {
            headers: { authorization: localStorage.getItem('token') }
          }
        )
        setPaymentHistories(res.data.payload.paymentHistories)
      } catch (error) {
        console.error(error)
        toast.error('Network Error')
      }
    }

    const getPaymentSessions = async () => {
      try {
        const res = await axios.post(
          '/api/accounting/get-payment-sessions',
          { ticketId },
          {
            headers: { authorization: localStorage.getItem('token') }
          }
        )
        setPaymentSessions(res.data.payload.paymentSessions)
      } catch (error) {
        console.error(error)
        toast.error('Network Error')
      }
    }
    getPaymentHistories()
    getPaymentSessions()
  }, [])

  const pushNewPaymentInPaymentHistories = (newPaymentHistory: any, session: any) => {
    setPaymentHistories([...paymentHistories, newPaymentHistory])

    const newState = paymentSessions.map((s: any) => {
      if (s._id === session._id) return session

      return s
    })
    setPaymentSessions(newState)
  }

  return (
    <>
      {paymentSessions.map((session: any) => {
        // console.log(session.session)
        return (
          <Card sx={{ mt: 10 }}>
            <CardContent>
              <AddCreditPaymentDialog
                ticketId={ticketId}
                session={session}
                pushNewPaymentInPaymentHistories={pushNewPaymentInPaymentHistories}
              />
              <Grid container>
                <Grid item xs={12} sm={2}>
                  <Typography>Total Payment</Typography>
                  <Typography>{session.total_payment}</Typography>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Typography>Remaining Payment</Typography>
                  <Typography>{session.remaining_payment}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>Advance Payment</Typography>
                  <Typography>{session.advance_payment}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>Sales Type</Typography>
                  <Typography>{session.sales_type}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>Closer</Typography>
                  <Typography>{session?.closer_id?.user_name}</Typography>
                </Grid>
                {session?.fronter_id && (
                  <Grid item xs={12} sm={2}>
                    <Typography>Fronter</Typography>
                    <Typography>{session?.fronter_id?.user_name}</Typography>
                  </Grid>
                )}
              </Grid>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Remaining</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentHistories.map((history: any) => {
                      if (history.payment_session_id !== session._id) return
                      return (
                        <TableRow key={history._id}>
                          <TableCell>{moment(history?.createdAt).format('D MMMM YYYY')}</TableCell>
                          <TableCell>{history.payment_type}</TableCell>
                          <TableCell>{history.received_amount}</TableCell>
                          <TableCell>{history.remaining_amount}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

export default ViewPaymentHistories
