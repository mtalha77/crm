import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

interface PaymentHistory {
  total_payment: number
  advance_payment: number
  remaining_payment: number
}

function AddNewPayment({ ticketId, fetchAgain, setShow }: any) {
  const [apiLoading, setApiLoading] = useState(false)
  const defaultValues: PaymentHistory = {
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0
  }

  const schema: yup.ObjectSchema<PaymentHistory> = yup.object().shape({
    total_payment: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .max(1000000000, 'Remaining cannot exceed 1000000000 characters')
      .min(1, 'Cannot be less than 1')
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
    formState: { errors },
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

  const onSubmit = async (data: PaymentHistory) => {
    const { total_payment, advance_payment, remaining_payment } = data
    const reqData = {
      total_payment,
      advance_payment,
      remaining_payment
    }
    try {
      setApiLoading(true)
      await axios.patch(
        '/api/business-ticket/add-new-payment',
        { ticketId, payment: reqData },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      toast.success('Payment added successfully')
      setShow(false)
      fetchAgain()
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data)
    } finally {
      setApiLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth error={!!errors.total_payment}>
            <Controller
              name='total_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    size='small'
                    type='number'
                    {...field}
                    label='Total'
                    error={Boolean(errors?.total_payment)}
                    fullWidth
                  />
                  {errors.total_payment && <FormHelperText>{errors.total_payment.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth error={!!errors.advance_payment}>
            <Controller
              name='advance_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    size='small'
                    type='number'
                    {...field}
                    label='Advance'
                    error={Boolean(errors?.advance_payment)}
                    fullWidth
                  />
                  {errors.advance_payment && <FormHelperText>{errors.advance_payment.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth error={!!errors.remaining_payment}>
            <Controller
              name='remaining_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled
                    size='small'
                    type='number'
                    {...field}
                    label='Remaining'
                    error={Boolean(errors?.remaining_payment)}
                    fullWidth
                  />
                  {errors.remaining_payment && <FormHelperText>{errors.remaining_payment.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button type='submit' variant='contained' disabled={apiLoading}>
            {apiLoading && <CircularProgress sx={{ marginInline: '10px' }} size={24} color='inherit' />}
            {apiLoading ? 'Adding' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddNewPayment
