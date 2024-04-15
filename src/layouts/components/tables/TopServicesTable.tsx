import { useMemo } from 'react'

import MuiTable from './MuiTable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { Box, Button, Typography } from '@mui/material'
import TopServicesColumns from './columns/TopServicesColumns'

function TopServicesTable({ data, isLoading, month }: any) {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Top Services'
  })

  const handleExportData = () => {
    const rowData = data.map((d: any) => {
      return {
        date: month,
        Ranking: d.index,
        'work type': d._id,
        'Total Payment Received ($)': d.totalReceivedPayment
      }
    })
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const getTotal = (rows: any[]) => {
    let total = 0
    rows.forEach((r: any) => {
      total = total + r.original.totalReceivedPayment
    })

    return total
  }

  const columns: any = useMemo(() => TopServicesColumns(), [data])

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          enableColumnFilters: false,
          enablePagination: false,
          state: {
            isLoading: isLoading
          },
          enableFacetedValues: true,
          initialState: {
            showGlobalFilter: true
          },
          renderTopToolbarCustomActions: ({ table }: any) => (
            <Box>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportData()}
                variant='contained'
                startIcon={<FileDownloadIcon />}
              >
                Export Csv
              </Button>
              <Typography variant='h5' sx={{ mt: 5, mb: 2 }}>{`Total : $${getTotal(
                table.getPrePaginationRowModel().rows
              )}`}</Typography>
            </Box>
          )
        }}
      />
    </>
  )
}

export default TopServicesTable
