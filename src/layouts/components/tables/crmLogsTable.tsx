import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { crmLogsTableColumns } from './columns/crmLogsTableColumns'
import { Box, Button, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import dayjs from 'dayjs'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { subDays } from 'date-fns'
import PickersRange from '../datePickers/RangePicker'

function CrmLogsTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [crmLogs, setCrmLogs] = useState([])
  const [startDate, setStartDate] = useState(subDays(new Date(), 15)) // 15 days before current date
  const [endDate, setEndDate] = useState(new Date()) // Current date

  const handleDateChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const extractInfo = (msg: any) => {
    // Split the message by spaces
    const parts = msg.split(' ')

    // Find the index of "from" and "department"
    const fromIndex = parts.indexOf('from')
    const departmentIndex = parts.indexOf('department')

    // If "from" or "department" is not found, return null
    if (fromIndex === -1 || departmentIndex === -1) {
      return null
    }

    // Extract IP, name, and department
    const ip = parts[0].replace(':', '') // Remove the colon from the IP
    const name = parts.slice(1, fromIndex).join(' ').replace(':', '') // Join the name parts
    const department = parts[departmentIndex + 1] // Join the department parts

    return {
      ip,
      name,
      department
    }
  }

  const logsWithDetails = (logs: any) => {
    return logs.map(log => {
      const details = extractInfo(log.msg) || { ip: 'N/A', name: 'N/A', department: 'N/A' }

      return {
        ...log,
        details: details,
        date: log.createdAt,
        time: log.createdAt
      }
    })
  }

  const fetchCrmLogs = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(
        `/api/get-logs`,
        { startDate: dayjs(startDate).startOf('day'), endDate: dayjs(endDate).endOf('day') },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )

      const formatedLogs = logsWithDetails(res.data.payload.logs)

      setCrmLogs(formatedLogs)
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch crm logs.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (startDate && endDate) fetchCrmLogs()
  }, [startDate, endDate])

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'CRM Logs'
  })

  const handleExportRows = (rows: any[]) => {
    const rowData = rows.map(d => {
      const details = extractInfo(d.msg)

      return {
        Date: dayjs(d.createdAt).format('YYYY-MM-DD'),
        Time: dayjs(d.createdAt).format('HH:mm:ss'),
        Name: details?.name,
        Department: details?.department,
        IP: details?.ip,
        Message: d?.msg
      }
    })

    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const getTotal = (rows: any[]) => {
    return rows.length
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PickersRange handleDateChange={handleDateChange} startDate={startDate} endDate={endDate} />
        <Button
          disabled={crmLogs.length === 0}
          onClick={() => handleExportRows(crmLogs)}
          variant='contained'
          startIcon={<FileDownloadIcon />}
        >
          Export CSV
        </Button>
      </Box>
      <Typography variant='h5' sx={{ mb: 2 }}>{`Total: ${getTotal(crmLogs)}`}</Typography>
      <MuiTable
        data={crmLogs}
        columns={crmLogsTableColumns}
        options={{
          state: {
            isLoading
          },
          initialState: {
            density: 'compact'
          }
        }}
      />
    </Box>
  )
}

export default CrmLogsTable
