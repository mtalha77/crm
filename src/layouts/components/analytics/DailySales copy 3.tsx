// ** Frontend Implementation **
// DailySalesChart.tsx

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import PickersMonthYear from 'src/layouts/components/datePickers/MonthPicker'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import WeeklySalesChart from './WeeklySales'
import utc from 'dayjs/plugin/utc'
import CircularProgress from '@mui/material/CircularProgress'

interface SaleData {
  full_date: string
  total_sales: number
  date: number
}

interface ApiResponse {
  message: string
  payload: {
    stats: SaleData[]
    startDay: string
    endDay: string
  }
}

const DailySalesChart = ({ username }: { username: string }) => {
  // ** Hooks & Plugins
  dayjs.extend(weekOfYear)
  dayjs.extend(utc)
  const theme = useTheme()

  // ** States
  const [series, setSeries] = useState<{ data: number[] }[]>([{ data: [] }])
  const [month, setMonth] = useState<DateType>(new Date())
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [dateLabels, setDateLabels] = useState<string[]>([])
  const [weekNumbers, setWeekNumbers] = useState<number[]>([])
  const [totalWeekSales, setTotalWeekSales] = useState<number[]>([])
  const [oTotalWeekSales, setOTotalWeekSales] = useState<number[]>([0, 0, 0, 0, 0])

  // ** Helper Functions
  const generateDateArray = (startDate: string, endDate: string): string[] => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const dates: string[] = []
    let current = start

    while (current.isBefore(end) || current.isSame(end, 'day')) {
      dates.push(current.format('MM/DD'))
      current = current.add(1, 'day')
    }

    return dates
  }

  const groupSalesByWeek = (data: SaleData[]) => {
    const groups: { [key: number]: number } = {}

    data.forEach((item) => {
      const currentDate = dayjs(item.full_date)
      const weekNumber = Math.ceil(currentDate.date() / 7)

      if (!groups[weekNumber]) {
        groups[weekNumber] = 0
      }

      groups[weekNumber] += item.total_sales
    })

    return groups
  }

  const fetchDailySales = async () => {
    setLoading(true)
    const year = dayjs(month).year()
    const monthNumber = dayjs(month).month() + 1

    try {
      const user_name = username !== 'All' ? username : undefined

      const res = await axios.get<ApiResponse>(
        `/api/stats/get-daily-sales?year=${year}&month=${monthNumber}&user_name=${user_name}`,
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )

      // Generate date labels based on custom calendar
      const startDate = `${year}-${res.data.payload.startDay}`
      const endDate = `${year}-${res.data.payload.endDay}`
      const dates = generateDateArray(startDate, endDate)
      setDateLabels(dates)

      // Initialize sales data array
      const salesData = new Array(dates.length).fill(0)

      // Map sales data to correct dates
      res.data.payload.stats.forEach((sale) => {
        const saleDate = dayjs(sale.full_date)
        const dayIndex = dates.findIndex(
          date => dayjs(date, 'MM/DD').format('MM/DD') === saleDate.format('MM/DD')
        )
        if (dayIndex !== -1) {
          salesData[dayIndex] = sale.total_sales
        }
      })

      // Update states
      setTotal(salesData.reduce((acc, curr) => acc + curr, 0))
      setSeries([{ data: salesData }])

      // Process weekly data
      const salesByWeek = groupSalesByWeek(res.data.payload.stats)
      const oTotalSales = new Array(5).fill(0)

      Object.entries(salesByWeek).forEach(([key, value]) => {
        const weekIndex = parseInt(key, 10) - 1
        if (weekIndex >= 0 && weekIndex < 5) {
          oTotalSales[weekIndex] = value
        }
      })

      setWeekNumbers(Object.keys(salesByWeek).map(Number))
      setTotalWeekSales(Object.values(salesByWeek))
      setOTotalWeekSales(oTotalSales)

    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch sales data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (month) {
      fetchDailySales()
    }
  }, [month, username])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      height: 100
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '80%'
      }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight', width: 2 },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `$${val.toFixed(2)}`
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom({ series, seriesIndex, dataPointIndex }: any) {
        return `
          <div class='bar-chart'>
            <span>${dateLabels[dataPointIndex]}: $${series[seriesIndex][dataPointIndex]}</span>
          </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled },
        rotate: -45
      },
      categories: dateLabels
    }
  }

  return (
    <Card>
      <CardHeader
        title='Monthly Sales Report'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PickersMonthYear
            popperPlacement='auto-start'
            month={month}
            setMonth={setMonth}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ApexChartWrapper>
            <ReactApexcharts
              type='bar'
              height={350}
              options={options}
              series={series}
            />
            <WeeklySalesChart
              weekNumbers={weekNumbers}
              totalWeekSales={totalWeekSales}
              oTotalWeekSales={oTotalWeekSales}
            />
          </ApexChartWrapper>
        )}
      </CardContent>
    </Card>
  )
}

export default DailySalesChart








