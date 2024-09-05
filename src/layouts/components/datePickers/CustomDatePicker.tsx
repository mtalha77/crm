// CustomDatePicker.jsx
import { TextField } from '@mui/material'
import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef(({ ...props }: any, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const CustomDatePicker = ({ value, onChange, label='Date' }) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        selected={value}
        showYearDropdown
        showMonthDropdown
        onChange={onChange}
        placeholderText='MM/DD/YYYY'
        autoFocus={true}
        customInput={
          <CustomInput
            value={value}
            onChange={onChange}
            label={label}
            aria-describedby='validation-basic-dob'
          />
        }
      />
    </DatePickerWrapper>
  )
}

export default CustomDatePicker
