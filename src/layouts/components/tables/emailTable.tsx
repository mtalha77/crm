import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useAuth } from 'src/hooks/useAuth' // Auth hook
import { UserRole } from 'src/shared/enums/UserRole.enum' // User roles
import EmailBusinessesColumns from './columns/EmailBusinessColumns'

function EmailBusinessesTable() {
  const [data, setData] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState('') // State for template selection
  const [availableTemplates, setAvailableTemplates] = useState<string[]>([])
  const { user } = useAuth() // Get user data
  const isAdmin = user?.role === UserRole?.ADMIN // Check if user is admin
  const [externalEmails, setExternalEmails] = useState<string>('') // External emails input

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

  const handleSendSelectedEmails = async (
    selectedRows: { original: { business_name?: string; business_email: string } }[]
  ) => {
    if (!selectedTemplate) {
      toast.error('Please select a template!')

      return
    }

    try {
      // Extract selected business emails
      const recipients = selectedRows.map(row => ({
        business_name: row.original.business_name || null, // Keep null if no business_name
        business_email: row.original.business_email
      }))

      // Add external emails
      if (externalEmails.trim()) {
        const externalRecipients = externalEmails.split(',').map(email => ({
          business_name: null, // Explicitly set to null for external emails
          business_email: email.trim()
        }))
        recipients.push(...externalRecipients)
      }

      const response = await axios.post('/api/send-email/send-emails', {
        recipients,
        template: selectedTemplate
      })

      if (response.status === 200) {
        toast.success('Emails sent successfully!')
        setExternalEmails('') // Clear the input after successful sending
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

  const columns: any = useMemo(() => EmailBusinessesColumns(updateStatus), [data])

  useEffect(() => {
    fetchBusinesses()
  }, [])

  useEffect(() => {
    const fetchTemplates = () => {
      const templates = ['newYear', 'christmas'] // Add template names dynamically
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
    const rowData = rows.map(d => ({
      Name: d.original.business_name,
      Email: d.original.business_email,
      Number: d.original.business_number,
      Status: d.original.status
    }))

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

          enableRowSelection: isAdmin, // Enable row selection
          initialState: {
            density: 'compact'
          },
          renderTopToolbarCustomActions: ({ table }: any) => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Actions Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                {/* Export CSV Button */}
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                  variant='contained'
                  startIcon={<FileDownloadIcon />}
                >
                  Export CSV
                </Button>

                {/* Template Selection Dropdown */}
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

                {/* Send Emails Button */}
                <Button
                  disabled={table.getSelectedRowModel().rows.length === 0 && !externalEmails.trim()}
                  onClick={() => handleSendSelectedEmails(table.getSelectedRowModel().rows)}
                  variant='contained'
                  color='secondary'
                >
                  Send Emails
                </Button>
              </Box>

              {/* External Emails Input */}
              <TextField
                label='External Emails (comma-separated)'
                value={externalEmails}
                onChange={e => setExternalEmails(e.target.value)}
                fullWidth // Make the input field span the full width
                placeholder='Enter external email addresses'
              />
            </Box>
          )
        }}
      />
    </>
  )
}

export default EmailBusinessesTable
