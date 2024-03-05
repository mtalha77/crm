import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import SubmitButton from './newTicketForm/SharedField/FormButton'

interface Payment {
  total_payment: number
  advance_payment: number
  remaining_payment: number
  refund_amount?: number | null
  reason?: string
}
function SinglePaymentHistory(props: any) {
  const { payment, ticketId, fetchAgain } = props

  const defaultValues: Payment = {
    total_payment: payment.total_payment,
    advance_payment: payment.advance_payment,
    remaining_payment: payment.remaining_payment,
    refund_amount: null,
    reason: ''
  }
  const schema: yup.ObjectSchema<Payment> = yup.object().shape({
    total_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .min(0, 'Cannot be less than 0')
      .required('Price is required'),
    advance_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .required('Advance is required'),
    remaining_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .required('Remaining is required'),
    refund_amount: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .min(1, 'Cannot be less than 1'),
    reason: yup.string().max(200, 'reason cannot exceed 200 characters')
  })
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue
  } = methods

  const totalPrice = watch('total_payment')
  const advancePrice = watch('advance_payment')

  // const refund_amount = watch('refund_amount')

  useEffect(() => {
    setValue('remaining_payment', totalPrice - advancePrice, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [totalPrice, advancePrice])

  // useEffect(() => {
  //   if (refund_amount) {
  //     setValue('advance_payment', advancePrice - refund_amount, {
  //       shouldValidate: true,
  //       shouldDirty: true
  //     })
  //   }
  // }, [refund_amount])

  const onSubmit = async (data: Payment) => {
    const { total_payment, advance_payment, remaining_payment, refund_amount } = data
    const reqData = {
      total_payment,
      advance_payment,
      remaining_payment
    }
    try {
      await axios.patch(
        '/api/business-ticket/update-payment',
        { ticketId, payment: reqData, payment_id: payment._id, refund_amount: refund_amount },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      toast.success('Payment updated successfully')
      // setShow(false)
      fetchAgain()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data)
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography>Creation Date : {moment(payment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Grid>

            <Grid item sm={3} xs={12}>
              <FormControl error={!!errors.total_payment}>
                <Controller
                  name='total_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        size='small'
                        type='number'
                        {...field}
                        label='Total Payment'
                        error={Boolean(errors?.total_payment)}
                        fullWidth
                      />
                      {errors.total_payment && <FormHelperText>{errors.total_payment.message}</FormHelperText>}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
              <FormControl error={!!errors.advance_payment}>
                <Controller
                  name='advance_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        size='small'
                        type='number'
                        {...field}
                        label='Advance Payment'
                        error={Boolean(errors?.advance_payment)}
                        fullWidth
                      />
                      {errors.advance_payment && <FormHelperText>{errors.advance_payment.message}</FormHelperText>}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
              <FormControl error={!!errors.total_payment}>
                <Controller
                  name='remaining_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        size='small'
                        type='number'
                        {...field}
                        label='Remaining Payment'
                        error={Boolean(errors?.remaining_payment)}
                        fullWidth
                      />
                      {errors.remaining_payment && <FormHelperText>{errors.remaining_payment.message}</FormHelperText>}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
              <FormControl error={!!errors.refund_amount}>
                <Controller
                  name='refund_amount'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        size='small'
                        type='number'
                        {...field}
                        label='Refund'
                        error={Boolean(errors?.refund_amount)}
                        fullWidth
                      />
                      {errors.refund_amount && <FormHelperText>{errors.refund_amount.message}</FormHelperText>}
                    </>
                  )}
                />
              </FormControl>{' '}
            </Grid>

            <Grid item xs={12}>
              <SubmitButton
                sx={{ width: '120px' }}
                beforeText={'update'}
                afterText={'Updating'}
                fullWidth
                variant='contained'
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Divider
        sx={{ marginBottom: 8, marginTop: 8, backgroundColor: '#666CFF', height: '5px', borderRadius: '50px' }}
      />
    </>
  )
}

export default SinglePaymentHistory
