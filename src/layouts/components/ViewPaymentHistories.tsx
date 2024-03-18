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
  Tooltip,
  CircularProgress,
  FormControl,
  Select,
  MenuItem
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AddCreditPaymentDialog from './dialogs/AddCreditPaymentDialog'
import ChangeTotalPaymentDialog from './dialogs/ChangeTotalPayment'
import ChangeAdvancePaymentDialog from './dialogs/ChangeAdvancePayment'
import DeleteIcon from '@mui/icons-material/Delete'
import { useConfirm } from 'material-ui-confirm'
import { SaleEmployeeRole } from 'src/shared/enums/UserRole.enum'

const CloserComponent = ({ defaultValue, closers, id }: any) => {
  const [value, setValue] = useState(defaultValue)
  const handleChange = async (user_name: string) => {
    const userFound: any = closers.find((e: any) => e.user_name === user_name)
    try {
      await axios.patch(
        '/api/accounting/change-closer',
        {
          id,
          closerId: userFound._id
        },
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }
      )
      toast.success('Closer updated successfully')
    } catch (error) {
      toast.success('Network Error')
    }
  }

  return (
    <>
      <FormControl>
        <Select
          size='small'
          sx={{ fontSize: '14px' }}
          onChange={e => {
            handleChange(e.target.value)
            setValue(e.target.value)
          }}
          value={value}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem value=''>Not Assigned</MenuItem> */}
          {closers &&
            closers.length > 0 &&
            closers.map((e: any) => {
              if (e.sub_role !== SaleEmployeeRole.CLOSER) return

              return (
                <MenuItem key={e.user_name} value={e.user_name}>
                  {e.user_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </>
  )
}
function ViewPaymentHistories() {
  const [paymentHistories, setPaymentHistories] = useState<any>([])
  const [paymentSessions, setPaymentSessions] = useState<any>([])
  const [deleteLoading, setDeleteLoading] = useState('')
  const [tempSessions, setTempSessions] = useState<any>([])
  const confirm = useConfirm()
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

  useEffect(() => {
    if (paymentHistories.length > 0 && paymentSessions.length > 0) {
      const tempSessions2 = [...paymentSessions]

      tempSessions2.forEach((s: any) => {
        s.paymentHistory = []
      })
      paymentHistories.forEach((h: any) => {
        h.payment_session_id
        const sessionIndex = paymentSessions.findIndex((s: any) => s._id === h.payment_session_id)
        if (sessionIndex === -1) return
        tempSessions2[sessionIndex].paymentHistory.push(h)
      })
      setTempSessions(tempSessions2)
    }
  }, [paymentHistories, paymentSessions])

  const pushNewPaymentInPaymentHistories = (newPaymentHistory: any, session: any) => {
    setPaymentHistories([...paymentHistories, newPaymentHistory])

    const newState = paymentSessions.map((s: any) => {
      if (s._id === session._id) return session

      return s
    })
    setPaymentSessions(newState)
  }

  const handleChangeTotalPayment = (paymentHistory: any, session: any) => {
    setPaymentHistories(() => {
      return paymentHistories.map((ph: any) => {
        if (ph._id === paymentHistory._id) {
          return paymentHistory
        }

        return ph
      })
    })

    const newState = paymentSessions.map((s: any) => {
      if (s._id === session._id) return session

      return s
    })
    setPaymentSessions(newState)
  }

  const handleChangeAdvancePayment = (paymentHistory: any, session: any) => {
    setPaymentHistories(() => {
      return paymentHistories.map((ph: any) => {
        if (ph._id === paymentHistory._id) {
          return paymentHistory
        }

        return ph
      })
    })

    const newState = paymentSessions.map((s: any) => {
      if (s._id === session._id) return session

      return s
    })
    setPaymentSessions(newState)
  }

  const handleDelete = (history: any, session: any) => {
    confirm({ description: `This will permanently delete this payment history.` }).then(() => {
      setDeleteLoading(history._id)
      axios
        .patch(
          '/api/accounting/delete-payment-history',
          { paymentHistoryId: history._id, sessionId: session._id },
          {
            headers: { authorization: localStorage.getItem('token') }
          }
        )
        .then(() => {
          toast.success('Payment history deleted successfully')

          setPaymentHistories(paymentHistories.filter((ph: any) => ph._id !== history._id))
          const newState = paymentSessions.map((s: any) => {
            if (s._id === session._id)
              return { ...session, remaining_payment: session.remaining_payment + history.received_payment }

            return s
          })
          setPaymentSessions(newState)
        })
        .catch(error => {
          toast.error(error.response?.data)
        })
        .finally(() => {
          setDeleteLoading('')
        })
    })
  }
  const checkDisable = (sId: string, hId: string) => {
    if (tempSessions.length <= 0) return true

    const sessionIndex = tempSessions.findIndex((s: any) => s._id === sId)
    let fl = false
    if (tempSessions[sessionIndex].paymentHistory.length === 1) return fl

    if (tempSessions[sessionIndex].paymentHistory[tempSessions[sessionIndex].paymentHistory.length - 1]._id === hId)
      fl = true

    return fl
  }
  const [saleUsers, setSaleUsers] = useState([])
  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await axios.get('/api/user/get-sales-user', {
          headers: { authorization: localStorage.getItem('token') }
        })

        setSaleUsers(res.data.payload.salesUsers)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  return (
    <>
      {paymentSessions.map((session: any) => {
        // console.log(session.session)
        return (
          <Card sx={{ mt: 10 }} key={session._id}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <ChangeTotalPaymentDialog
                    ticketId={ticketId}
                    session={session}
                    handleChangeTotalPayment={handleChangeTotalPayment}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ChangeAdvancePaymentDialog
                    session={session}
                    handleChangeAdvancePayment={handleChangeAdvancePayment}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AddCreditPaymentDialog
                    ticketId={ticketId}
                    session={session}
                    pushNewPaymentInPaymentHistories={pushNewPaymentInPaymentHistories}
                  />
                </Grid>
              </Grid>
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
                      <TableCell>Closer</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Remaining</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentHistories.map((history: any) => {
                      if (history.payment_session_id !== session._id) return

                      return (
                        <TableRow key={history._id}>
                          <TableCell>{moment(history?.createdAt).format('D MMMM YYYY')}</TableCell>
                          <TableCell>
                            <CloserComponent
                              defaultValue={history.closer_id?.user_name}
                              closers={saleUsers}
                              id={history._id}
                            />
                          </TableCell>
                          <TableCell>{history.payment_type}</TableCell>
                          <TableCell>{history.received_payment}</TableCell>
                          <TableCell>{history.remaining_payment}</TableCell>
                          <TableCell>
                            {deleteLoading === history._id ? (
                              <CircularProgress size={25} />
                            ) : (
                              checkDisable(session._id, history._id) && (
                                <Tooltip title='Delete'>
                                  <DeleteIcon
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(history, session)}
                                  />
                                </Tooltip>
                              )
                            )}
                          </TableCell>
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
