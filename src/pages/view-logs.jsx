import { Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import addDays from 'date-fns/addDays'
import PickersRange from 'src/layouts/components/datePickers/RangePicker'
import dayjs from 'dayjs'
import { mkConfig, generateCsv, download } from 'export-to-csv'

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

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Logs'
  })

  const handleExportData = () => {
    const rowData = logs.map(d => {
      return {
        message: d.msg,
        level: d.level,
        'creation Date': dayjs(d.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        View Logs
      </Typography>
      <Button variant='contained' onClick={handleExportData}>
        Download CSV
      </Button>

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
