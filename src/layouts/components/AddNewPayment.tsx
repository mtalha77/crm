import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import dayjs from 'dayjs'

interface PaymentHistory {
  total_payment: number
  advance_payment: number
  remaining_payment: number
  closer: string
  closer_id: string
}

function AddNewPayment() {
  const [apiLoading, setApiLoading] = useState(false)
  const [closerPersons, setCloserPersons] = useState([])
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
  const [currentClientReportingDate, setCurrentClientReportingDate] = useState<Date | null>(null)
  const defaultValues: PaymentHistory = {
    total_payment: 0,
    advance_payment: 0,
    remaining_payment: 0,
    closer: '',
    closer_id: ''
  }
  const router = useRouter()
  const { ticketId } = router.query

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
      .required('Remaining is required'),
    closer: yup.string().required('Closer is required'),
    closer_id: yup.string().required('Closer ID is required')
  })
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    reset
  } = methods

  const totalPrice = watch('total_payment')
  const advancePrice = watch('advance_payment')

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues)
      setIsSubmitSuccessful(false)
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    setValue('remaining_payment', totalPrice - advancePrice, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [totalPrice, advancePrice])

  useEffect(() => {
    const getClosers = async () => {
      try {
        const res = await axios.get('/api/user/get-closer-users', {
          headers: { authorization: localStorage.getItem('token') }
        })
        setCloserPersons(res.data.payload.closerUsers)
      } catch (error) {
        console.error(error)
      }
    }
    getClosers()
  }, [])

  useEffect(() => {
    const getCurrentClientReportingDate = async () => {
      if (ticketId) {
        try {
          const res = await axios.get(`/api/business-ticket/${ticketId}`, {
            headers: { authorization: localStorage.getItem('token') }
          })
          setCurrentClientReportingDate(new Date(res.data.payload.ticket.client_reporting_date))
        } catch (error) {
          console.error('Error fetching current client reporting date:', error)
        }
      }
    }
    getCurrentClientReportingDate()
  }, [ticketId])

  const onSubmit = async (data: PaymentHistory) => {
    if (!currentClientReportingDate) {
      toast.error('Unable to fetch current client reporting date')

      return
    }

    const { total_payment, advance_payment, remaining_payment } = data
    const newClientReportingDate = dayjs(currentClientReportingDate).add(1, 'month').toDate()

    const reqData = {
      total_payment,
      advance_payment,
      remaining_payment,
      closer_id: data.closer_id,
      client_reporting_date: newClientReportingDate // Include the new client reporting date
    }

    if (!ticketId) {
      toast.error('Network Error')

      return
    }
    try {
      setApiLoading(true)
      await axios.patch(
        '/api/business-ticket/add-new-payment',
        { ticketId, ...reqData },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      toast.success('Recurring Payment Added')
      setIsSubmitSuccessful(true)
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={!!errors.total_payment}>
            <Controller
              name='total_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField type='number' {...field} label='Total' error={Boolean(errors?.total_payment)} fullWidth />
                  {errors.total_payment && <FormHelperText>{errors.total_payment.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={!!errors.advance_payment}>
            <Controller
              name='advance_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
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

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth error={!!errors.remaining_payment}>
            <Controller
              name='remaining_payment'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled
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

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-supportPerson-select'
              error={Boolean(errors?.closer)}
              htmlFor='validation-supportPerson-select'
            >
              Closer Person
            </InputLabel>
            <Controller
              name='closer'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Closer Person'
                  onChange={(e: any) => {
                    const closer: any = closerPersons.find((user: any) => user.user_name === e.target.value)
                    setValue('closer_id', closer._id)
                    onChange(e)
                  }}
                  error={Boolean(errors?.closer)}
                  labelId='validation-closerPerson-select'
                  aria-describedby='validation-closerPerson-select'
                >
                  {closerPersons.length > 0 &&
                    closerPersons.map((u: any) => {
                      return (
                        <MenuItem key={u._id} value={u.user_name}>
                          {u.user_name}
                        </MenuItem>
                      )
                    })}
                </Select>
              )}
            />
            {errors?.closer && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-closerPerson-select'>
                Closer person is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type='submit' variant='contained' disabled={apiLoading} sx={{ width: '100%' }}>
            {apiLoading && <CircularProgress sx={{ marginInline: '10px' }} size={24} color='inherit' />}
            {apiLoading ? 'Adding' : 'Add Recurring'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddNewPayment
