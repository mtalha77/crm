import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import BusinessesColumns from './columns/BusinessesColumns'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { Box, Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

function BusinessesTable() {
  const [data, setData] = useState([])
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
          initialState: {
            density: 'compact'
          },
          renderTopToolbarCustomActions: ({ table }: any) => (
            <Box>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                variant='contained'
                startIcon={<FileDownloadIcon />}
              >
                Export Csv
              </Button>
            </Box>
          )
        }}
      />
    </>
  )
}

export default BusinessesTable
