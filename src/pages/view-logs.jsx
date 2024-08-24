import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import addDays from 'date-fns/addDays'
import PickersRange from 'src/layouts/components/datePickers/RangePicker'
import dayjs from 'dayjs'

function ViewLogs() {
  const [logs, setLogs] = useState([])

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(addDays(new Date(), 15))

  const handleDateChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const fetchLogs = async () => {
    try {
      const res = await axios.post(
        `/api/get-logs`,
        { startDate: dayjs(startDate).startOf('day'), endDate: dayjs(endDate).endOf('day') },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      setLogs(res.data.payload.logs)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (startDate && endDate) fetchLogs()
  }, [startDate, endDate])

  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        View Logs
      </Typography>

      <PickersRange handleDateChange={handleDateChange} startDate={startDate} endDate={endDate} />
      <ul>
        {logs.map(log => {
          return <li>{log.msg}</li>
        })}
      </ul>
    </>
  )
}

export default ViewLogs
