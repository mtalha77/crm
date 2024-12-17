import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import BusinessesColumns from './columns/BusinessesColumns'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { Box, Button, MenuItem, Select } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

// import fs from 'fs' // Add this for local fetching

function BusinessesTable() {
  const [data, setData] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState('') // State for template selection
  const [availableTemplates, setAvailableTemplates] = useState<string[]>([])

  const [isLoading] = useState(false)
  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/api/business/get-all', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setData(res.data.payload.businesses)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSendSelectedEmails = async (selectedRows: any[]) => {
    if (!selectedTemplate) {
      toast.error('Please select a template!')

      return
    }

    try {
      const recipients = selectedRows.map(row => ({
        business_name: row.original.business_name,
        business_email: row.original.business_email
      }))

      const response = await axios.post('/api/send-email/send-emails', {
        recipients,
        template: selectedTemplate
      })

      if (response.status === 200) {
        toast.success('Emails sent successfully!')
      }
    } catch (error) {
      console.error('Error sending emails:', error)
      toast.error('Failed to send emails.')
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res: any = await axios.post(
        '/api/business/update-status',
        {
          id,
          status
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data)
    }
  }
  const columns: any = useMemo(() => BusinessesColumns(updateStatus), [data])

  useEffect(() => {
    fetchBusinesses()
  }, [])

  useEffect(() => {
    const fetchTemplates = () => {
      const templates = ['newsletter', 'promotional', 'postChristmas'] // Add template names dynamically
      setAvailableTemplates(templates)
    }
    fetchTemplates()
  }, [])
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Businesses'
  })

  const handleExportRows = (rows: any[]) => {
    const rowData = rows.map(d => {
      return {
        Name: d.original.business_name,
        Email: d.original.business_email,
        Number: d.original.business_number,
        Status: d.original.status
      }
    })

    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          state: {
            isLoading: isLoading
          },
          enableRowSelection: true, // Enable row selection
          initialState: {
            density: 'compact'
          },
          renderTopToolbarCustomActions: ({ table }: any) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Export CSV Button */}
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                variant='contained'
                startIcon={<FileDownloadIcon />}
              >
                Export CSV
              </Button>

              {/* Send Emails Button */}
              <Button
                disabled={table.getSelectedRowModel().rows.length === 0 || !selectedTemplate}
                onClick={() => handleSendSelectedEmails(table.getSelectedRowModel().rows)}
                variant='contained'
                color='secondary'
              >
                Send Emails
              </Button>

              {/* Template Selection Dropdown */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* <Typography>Select Template:</Typography> */}
                <Select
                  value={selectedTemplate}
                  onChange={e => setSelectedTemplate(e.target.value)}
                  displayEmpty
                  sx={{ width: 200 }}
                >
                  <MenuItem value='' disabled>
                    Select Template
                  </MenuItem>
                  {availableTemplates.map(template => (
                    <MenuItem key={template} value={template}>
                      {template.charAt(0).toUpperCase() + template.slice(1)} {/* Capitalize */}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )
        }}
      />
    </>
  )
}

export default BusinessesTable
