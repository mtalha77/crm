import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { forwardRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CommonFormType } from 'src/interfaces/forms.interface'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'

interface CustomInputProps {
  value: any
  label: string
  error: boolean
  onChange: (event: any) => void
}
const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const TicketDetails = (props: any) => {
  const {
    formState: { errors },
    control,
    watch,
    setValue
  } = useFormContext<CommonFormType>()

  const { update } = props

  const totalPrice = watch('ticketDetails.total_payment')
  const advancePrice = watch('ticketDetails.advance_payment')

  useEffect(() => {
    setValue('ticketDetails.remaining_payment', totalPrice - advancePrice, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [totalPrice, advancePrice])

  return (
    <>
      <Grid container spacing={5}>
        {!update && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.ticketDetails?.total_payment}>
                <Controller
                  name='ticketDetails.total_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        type='number'
                        {...field}
                        label='Price'
                        error={Boolean(errors?.ticketDetails?.total_payment)}
                        fullWidth
                      />
                      {errors.ticketDetails?.total_payment && (
                        <FormHelperText>{errors?.ticketDetails?.total_payment?.message}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.ticketDetails?.advance_payment}>
                <Controller
                  name='ticketDetails.advance_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        type='number'
                        {...field}
                        label='Advance'
                        error={Boolean(errors?.ticketDetails?.advance_payment)}
                        fullWidth
                      />
                      {errors.ticketDetails?.advance_payment && (
                        <FormHelperText>{errors.ticketDetails.advance_payment.message}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.ticketDetails?.remaining_payment}>
                <Controller
                  name='ticketDetails.remaining_payment'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        type='number'
                        disabled
                        {...field}
                        label='Remaining'
                        error={Boolean(errors?.ticketDetails?.remaining_payment)}
                        fullWidth
                      />
                      {errors.ticketDetails?.remaining_payment && (
                        <FormHelperText>{errors.ticketDetails.remaining_payment.message}</FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ticketDetails?.priority}>
            <InputLabel htmlFor='priorityLevel'>Priority Level</InputLabel>
            <Controller
              name='ticketDetails.priority'
              control={control}
              render={({ field }) => (
                <>
                  <Select {...field} label='Priority Level' error={Boolean(errors?.ticketDetails?.priority)} fullWidth>
                    {PriorityTypeValues.map((v: any) => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.ticketDetails?.priority && (
                    <FormHelperText>{errors.ticketDetails.priority.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='ticketDetails.due_date'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DatePickerWrapper>
                <DatePicker
                  selected={value}
                  showYearDropdown
                  showMonthDropdown
                  onChange={e => onChange(e)}
                  placeholderText='MM/DD/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={onChange}
                      label='Due Date'
                      error={Boolean(errors.ticketDetails?.due_date)}
                      aria-describedby='validation-basic-dob'
                    />
                  }
                />
              </DatePickerWrapper>
            )}
          />
          {errors.ticketDetails?.due_date && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
              {errors?.ticketDetails?.due_date?.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='ticketDetails.client_reporting_date'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <DatePickerWrapper>
                <DatePicker
                  selected={value}
                  showYearDropdown
                  showMonthDropdown
                  onChange={e => onChange(e)}
                  placeholderText='MM/DD/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={onChange}
                      label='Client Reporting Date'
                      error={Boolean(errors.ticketDetails?.client_reporting_date)}
                      aria-describedby='validation-basic-dob'
                    />
                  }
                />
              </DatePickerWrapper>
            )}
          />
          {errors.ticketDetails?.client_reporting_date && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
              {errors?.ticketDetails?.client_reporting_date?.message}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default TicketDetails
