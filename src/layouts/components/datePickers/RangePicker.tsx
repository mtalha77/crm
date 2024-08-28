// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'

import DatePicker from 'react-datepicker'

// ** Types
// eslint-disable-next-line
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

const CustomInput = forwardRef((props: PickerProps, ref) => {
  const startDate = format(props.start, 'dd/MM/yyyy')
  const endDate = props.end !== null ? format(props.end, 'dd/MM/yyyy') : null
  const value = `${startDate} - ${endDate ? endDate : ''}`

  return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
})

const PickersRange = ({ popperPlacement, handleDateChange, startDate, endDate }: any) => {
  // ** States

  // const [startDate, setStartDate] = useState<DateType>(new Date())
  // const [endDate, setEndDate] = useState<DateType>(addDays(new Date(), 15))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePickerWrapper>
          <DatePicker
            selectsRange
            endDate={endDate}
            selected={startDate}
            startDate={startDate}
            id='date-range-picker'
            onChange={handleDateChange}
            shouldCloseOnSelect={false}
            popperPlacement={popperPlacement}
            customInput={
              <CustomInput label='Date Range' start={startDate as Date | number} end={endDate as Date | number} />
            }
          />
        </DatePickerWrapper>
      </div>
    </Box>
  )
}

export default PickersRange
