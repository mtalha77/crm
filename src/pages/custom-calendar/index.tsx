import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import EditIcon from '@mui/icons-material/Edit'
import { format, parse } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import { SectionLoader } from 'src/components/Loader'

// TypeScript interface for CustomCalendar
interface CustomCalendar {
  _id?: string
  month_number: number
  month_name: string
  start_day: string
  end_day: string
}

const CustomCalendarManager = () => {
  const [calendars, setCalendars] = useState<CustomCalendar[]>([])
  const [open, setOpen] = useState(false)
  const [editingCalendar, setEditingCalendar] = useState<CustomCalendar | null>(null)
  const [formData, setFormData] = useState<{
    start_day_date: Date | null
    end_day_date: Date | null
  }>({
    start_day_date: null,
    end_day_date: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch calendars
  const fetchCalendars = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/custom-calendar/get', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setCalendars(response.data.payload.calendar)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch calendars')
      toast.error('Failed to fetch calendars')

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalendars()
  }, [])

  const handleOpenDialog = (calendar?: CustomCalendar) => {
    if (calendar) {
      setEditingCalendar(calendar)
      setFormData({
        start_day_date: parse(calendar.start_day, 'MM-dd', new Date()),
        end_day_date: parse(calendar.end_day, 'MM-dd', new Date())
      })
    } else {
      setEditingCalendar(null)
      setFormData({
        start_day_date: null,
        end_day_date: null
      })
    }
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setEditingCalendar(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const updateData = {
        id: editingCalendar?._id,
        month_number: editingCalendar?.month_number,
        month_name: editingCalendar?.month_name,
        start_day: format(formData.start_day_date!, 'MM-dd'),
        end_day: format(formData.end_day_date!, 'MM-dd')
      }

      const response = await axios.post('/api/custom-calendar/update', updateData, {
        headers: { authorization: localStorage.getItem('token') }
      })

      if (response.status === 200) {
        toast.success('Calendar updated successfully')

        // Refresh calendars
        await fetchCalendars()
        handleCloseDialog()
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update calendar')
    }
  }

  const formatDateDisplay = (dateStr: string) => {
    const date = parse(dateStr, 'MM-dd', new Date())

    return format(date, 'MMM dd')
  }

  if (error) {
    return toast.error('Failed to fetch calendar')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ maxWidth: 1200, margin: 'auto', mt: 2 }}>
        <CardHeader title='Calendar Manager' />
        <SectionLoader loading={loading}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month Number</TableCell>
                    <TableCell>Month Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendars.map(calendar => (
                    <TableRow key={calendar._id}>
                      <TableCell>{calendar.month_number}</TableCell>
                      <TableCell>{calendar.month_name}</TableCell>
                      <TableCell>{formatDateDisplay(calendar.start_day)}</TableCell>
                      <TableCell>{formatDateDisplay(calendar.end_day)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton color='primary' onClick={() => handleOpenDialog(calendar)}>
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </SectionLoader>

        <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
          <DialogTitle>Edit Calendar Entry</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <DatePicker
                  label='Start Date'
                  value={formData.start_day_date}
                  onChange={newValue => setFormData({ ...formData, start_day_date: newValue })}
                  format='MMM dd'
                  views={['month', 'day']}
                  required
                  sx={{ width: '100%' }}
                />
                <DatePicker
                  label='End Date'
                  value={formData.end_day_date}
                  onChange={newValue => setFormData({ ...formData, end_day_date: newValue })}
                  format='MMM dd'
                  views={['month', 'day']}
                  required
                  sx={{ width: '100%' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type='submit' variant='contained'>
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Card>
    </LocalizationProvider>
  )
}

export default CustomCalendarManager
