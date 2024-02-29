import React, { forwardRef, useEffect } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'
import { DTicketDetails } from 'src/interfaces/departmentalForms.interface'

interface CustomInputProps {
  value: any
  label: string
  error: boolean
  onChange: (event: any) => void
}
const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})
function Common() {
  const {
    formState: { errors },
    control,
    watch,
    setValue
  } = useFormContext<DTicketDetails>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.priority}>
            <InputLabel htmlFor='priorityLevel'>Priority Level</InputLabel>
            <Controller
              name='priority'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <>
                  <Select {...field} label='Priority Level' error={Boolean(errors?.priority)} fullWidth>
                    {PriorityTypeValues.map((v: any) => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name='due_date'
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
                      error={Boolean(errors.due_date)}
                      aria-describedby='validation-basic-dob'
                    />
                  }
                />
              </DatePickerWrapper>
            )}
          />
          {errors.due_date && (
            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
              {errors?.due_date?.message}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Common
