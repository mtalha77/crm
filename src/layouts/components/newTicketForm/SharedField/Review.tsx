import React, { forwardRef, useEffect } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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

const Review = () => {
  const {
    formState: { errors },
    control,
    watch,
    setValue
  }: any = useFormContext()
  const totalPrice = watch('ssmReview.price')
  const advancePrice = watch('ssmReview.advance')

  useEffect(() => {
    setValue('ssmReview.remaining', totalPrice - advancePrice, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [totalPrice, advancePrice])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ssmReview?.priorityLevel}>
            <InputLabel htmlFor='priorityLevel'>Priority Level</InputLabel>
            <Controller
              name='ssmReview.priorityLevel'
              control={control}
              rules={{ required: 'Priority Level is required' }}
              render={({ field }) => (
                <>
                  <Select {...field} label='Priority Level' error={Boolean(errors?.ssmReview?.priorityLevel)} fullWidth>
                    {PriorityTypeValues.map((v: any) => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.ssmReview?.priorityLevel && (
                    <FormHelperText>{errors.ssmReview.priorityLevel.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ssmReview?.department}>
            <Controller
              name='ssmReview.department'
              control={control}
              rules={{ required: 'Department is required' }}
              render={({ field }) => (
                <>
                  <TextField {...field} label='Department' error={Boolean(errors?.ssmReview?.department)} fullWidth />
                  {errors.ssmReview?.department && (
                    <FormHelperText>{errors.ssmReview.department.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <Controller
            name='ssmReview.deadline'
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
                      error={Boolean(errors.ssmReview?.deadline)}
                      aria-describedby='validation-basic-dob'
                    />
                  }
                />
              </DatePickerWrapper>
            )}
          />
          {errors.ssmReview?.deadline && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
              {errors?.ssmReview?.deadline?.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ssmReview?.price}>
            <Controller
              name='ssmReview.price'
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    {...field}
                    label='Price'
                    error={Boolean(errors?.ssmReview?.price)}
                    fullWidth
                  />
                  {errors.ssmReview?.price && <FormHelperText>{errors?.ssmReview?.price?.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ssmReview?.advance}>
            <Controller
              name='ssmReview.advance'
              control={control}
              rules={{ required: 'Advance is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    {...field}
                    label='Advance'
                    error={Boolean(errors?.ssmReview?.advance)}
                    fullWidth
                  />
                  {errors.ssmReview?.advance && <FormHelperText>{errors.ssmReview.advance.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.ssmReview?.remaining}>
            <Controller
              name='ssmReview.remaining'
              control={control}
              rules={{ required: 'Remaining is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    disabled
                    {...field}
                    label='Remaining'
                    error={Boolean(errors?.ssmReview?.remaining)}
                    fullWidth
                  />
                  {errors.ssmReview?.remaining && <FormHelperText>{errors.ssmReview.remaining.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default Review
