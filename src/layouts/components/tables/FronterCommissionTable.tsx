import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import MuiTable from './MuiTable'
import FronterCommissionColumns from './columns/FronterCommissionColumns'
import dayjs from 'dayjs'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

function FronterCommissionTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCommissionRate = (amount: number) => {
    if (amount <= 500) return 0

    if (amount >= 501 && amount <= 800) return 2.5

    if (amount >= 801 && amount <= 1500) return 5

    if (amount >= 1501 && amount <= 2000) return 7.5

    if (amount >= 2001) return 10

    return 0
  }
  const fetchBusinesses = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('/api/commission/fronter', {
        headers: { authorization: localStorage.getItem('token') }
      })

      setData(() => {
        return res.data.payload.paymentHistory.map((p: any) => {
          const commissionAbleAmount = 0.9 * p.received_payment
          const commissionRate = getCommissionRate(commissionAbleAmount)
          const commission = (commissionRate / 100) * commissionAbleAmount

          return {
            ...p,
            commissionAbleAmount,
            commissionRate,
            commission
          }
        })
      })

      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  const columns: any = useMemo(() => FronterCommissionColumns(), [data])

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Fronter Commission Sheet'
  })

  const handleExportRows = (rows: any[]) => {
    const rowData = rows.map(d => {
      return {
        date: dayjs(d.original.createdAt).format('l'),
        'business name': d.original.business_id.business_name,
        'work type': d.original.ticket_id.work_status,
        'sales type': d.original.sales_type,
        fronter: d.original.fronter_id?.user_name,
        'payment received': d.original.received_payment,
        'commission able amount ($)': d.original.commissionAbleAmount,
        'commission rate (%)': d.original.commissionRate,
        'commission ($)': d.original.commission
      }
    })

    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const getTotal = (rows: any[]) => {
    let total = 0
    rows.forEach((r: any) => {
      total = total + r.original.commission
    })

    return total
  }

  useEffect(() => {
    fetchBusinesses()
  }, [])

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          enableFacetedValues: true,
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

export default FronterCommissionTable
