import { useMemo } from 'react'

import MuiTable from './MuiTable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { Box, Button, Typography } from '@mui/material'
import TopFrontersColumns from './columns/TopFrontersColumns'

function TopFrontersTable({ data, isLoading, month }: any) {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Top Fronters'
  })

  const handleExportData = () => {
    const rowData = data.map((d: any) => {
      return {
        date: month,
        Ranking: d.index,
        Username: d.user_name,
        'Total Sales ($)': d.total_sales
      }
    })
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const getTotal = (rows: any[]) => {
    let total = 0
    rows.forEach((r: any) => {
      total = total + r.original.total_sales
    })

    return total
  }

  const columns: any = useMemo(() => TopFrontersColumns(), [data])

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

export default TopFrontersTable
