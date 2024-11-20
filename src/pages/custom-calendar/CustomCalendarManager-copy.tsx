import React, { useState } from 'react'
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
  TextField,
  Alert,
  Snackbar
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import format from 'date-fns/format'
import parse from 'date-fns/parse'

const CustomCalendarManager = () => {
  const initialMonths = [
    { month_number: 1, month_name: 'Jan', start_day: '01-01', end_day: '02-18' },
    { month_number: 2, month_name: 'Feb', start_day: '02-21', end_day: '03-10' },
    { month_number: 3, month_name: 'Mar', start_day: '03-11', end_day: '04-15' },
    { month_number: 4, month_name: 'Apr', start_day: '04-16', end_day: '05-20' },
    { month_number: 5, month_name: 'May', start_day: '05-21', end_day: '06-25' },
    { month_number: 6, month_name: 'Jun', start_day: '06-26', end_day: '07-30' },
    { month_number: 7, month_name: 'Jul', start_day: '08-01', end_day: '08-31' },
    { month_number: 8, month_name: 'Aug', start_day: '09-01', end_day: '09-25' },
    { month_number: 9, month_name: 'Sep', start_day: '09-26', end_day: '10-15' },
    { month_number: 10, month_name: 'Oct', start_day: '10-16', end_day: '11-20' },
    { month_number: 11, month_name: 'Nov', start_day: '11-21', end_day: '12-10' },
    { month_number: 12, month_name: 'Dec', start_day: '12-11', end_day: '12-31' }
  ]

  const [months, setMonths] = useState(initialMonths)
  const [open, setOpen] = useState(false)
  const [editingMonth, setEditingMonth] = useState(null)
  const [formData, setFormData] = useState({
    month_number: '',
    month_name: '',
    start_day: '',
    end_day: ''
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleOpenDialog = (month = null) => {
    if (month) {
      setEditingMonth(month)
      setFormData({
        ...month,
        start_day_date: parse(month.start_day, 'MM-dd', new Date()),
        end_day_date: parse(month.end_day, 'MM-dd', new Date())
      })
    } else {
      setEditingMonth(null)
      setFormData({
        month_number: months.length + 1,
        month_name: '',
        start_day: '',
        end_day: '',
        start_day_date: null,
        end_day_date: null
      })
    }
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setEditingMonth(null)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newMonth = {
      month_number: parseInt(formData.month_number),
      month_name: formData.month_name,
      start_day: format(formData.start_day_date, 'MM-dd'),
      end_day: format(formData.end_day_date, 'MM-dd')
    }

    if (editingMonth) {
      setMonths(months.map(month => (month.month_number === editingMonth.month_number ? newMonth : month)))
      setSnackbar({
        open: true,
        message: 'Month updated successfully',
        severity: 'success'
      })
    } else {
      setMonths([...months, newMonth].sort((a, b) => a.month_number - b.month_number))
      setSnackbar({
        open: true,
        message: 'Month added successfully',
        severity: 'success'
      })
    }
    handleCloseDialog()
  }

  const handleDelete = monthNumber => {
    setMonths(months.filter(month => month.month_number !== monthNumber))
    setSnackbar({
      open: true,
      message: 'Month deleted successfully',
      severity: 'success'
    })
  }

  const formatDateDisplay = dateStr => {
    const date = parse(dateStr, 'MM-dd', new Date())

    return format(date, 'MMM dd')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ maxWidth: 1200, margin: 'auto', mt: 2 }}>
        <CardHeader
          title='Custom Calendar Manager'

          action={
            <Button disabled={months.length >= 12 ? true : false} variant='contained' startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
              Add Month
            </Button>
          }
        />
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
                {months.map(month => (
                  <TableRow key={month.month_number}>
                    <TableCell>{month.month_number}</TableCell>
                    <TableCell>{month.month_name}</TableCell>
                    <TableCell>{formatDateDisplay(month.start_day)}</TableCell>
                    <TableCell>{formatDateDisplay(month.end_day)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color='primary' onClick={() => handleOpenDialog(month)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color='error' onClick={() => handleDelete(month.month_number)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
          <DialogTitle>{editingMonth ? 'Edit Month' : 'Add New Month'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TextField
                  label='Month Number'
                  type='number'
                  value={formData.month_number}
                  onChange={e => setFormData({ ...formData, month_number: e.target.value })}
                  required
                  fullWidth
                  InputProps={{ inputProps: { min: 1, max: 12 } }}
                />
                <TextField
                  label='Month Name'
                  value={formData.month_name}
                  onChange={e => setFormData({ ...formData, month_name: e.target.value })}
                  required
                  fullWidth
                />
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
                {editingMonth ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set position to top-right
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </LocalizationProvider>
  )
}

export default CustomCalendarManager
