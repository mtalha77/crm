import { Box, Button, Divider, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import axios from 'axios'
import SubmitButton from './newTicketForm/SharedField/FormButton'

interface Refund {
  refund_amount: number
  reason?: string
  total_payment: number
  advance_payment: number
  remaining_payment: number
}
function SinglePaymentHistory(props: any) {
  const { payment, ticketId } = props

  const defaultValues: Refund = {
    refund_amount: 0,
    reason: '',
    total_payment: payment.total_payment,
    advance_payment: payment.advance_payment,
    remaining_payment: payment.remaining_payment
  }
  const schema: yup.ObjectSchema<Refund> = yup.object().shape({
    refund_amount: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .min(0, 'Cannot be less than 0')
      .required('Field is required'),
    reason: yup.string().max(200, 'reason cannot exceed 200 characters'),
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
      .required('Remaining is required')
  })
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    watch,
    setValue
  } = methods

  const totalPrice = watch('total_payment')
  const advancePrice = watch('advance_payment')

  useEffect(() => {
    setValue('remaining_payment', totalPrice - advancePrice, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [totalPrice, advancePrice])

  const onSubmit = async (data: Refund) => {
    const { total_payment, advance_payment, remaining_payment } = data
    const reqData = {
      total_payment,
      advance_payment,
      remaining_payment
    }
    try {
      await axios.patch(
        '/api/business-ticket/update-payment',
        { ticketId, payment: reqData, payemt_id: payment._id },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      toast.success('Payment added successfully')
      // setShow(false)
      // fetchAgain()
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
              {/* <Button variant='contained' disabled>
                Update
              </Button> */}
              <SubmitButton
                sx={{ width: '120px' }}
                beforeText={'update'}
                afterText={'Updating'}
                fullWidth
                variant='contained'
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ maxWidth: '320px', display: 'flex', justifyContent: 'space-between' }}>
                <TextField sx={{ width: '200px' }} type='number' label='Refund Amount' size='small' />
                <Button variant='contained'>Refund</Button>
              </Box>
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
