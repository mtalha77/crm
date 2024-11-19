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
  dayjs.extend(weekOfYear)
  dayjs.extend(utc)
  const theme = useTheme()

  const [series, setSeries] = useState<{ data: number[] }[]>([{ data: [] }])
  const [month, setMonth] = useState<DateType>(new Date())
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [dateLabels, setDateLabels] = useState<string[]>([])
  const [weekNumbers, setWeekNumbers] = useState<number[]>([])
  const [totalWeekSales, setTotalWeekSales] = useState<number[]>([])
  const [oTotalWeekSales, setOTotalWeekSales] = useState<number[]>([0, 0, 0, 0, 0])

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

      const { startDay, endDay, stats } = res.data.payload
      const { salesData, labels } = processSalesData(stats, startDay, endDay, year)

      setDateLabels(labels)
      setTotal(salesData.reduce((acc, curr) => acc + curr, 0))
      setSeries([{ data: salesData }])

      const weeksData = processWeeklyData(stats, startDay, endDay, year)
      setWeekNumbers(weeksData.weekNumbers)
      setTotalWeekSales(weeksData.totalSales)
      setOTotalWeekSales(weeksData.organizedSales)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch sales data')
    } finally {
      setLoading(false)
    }
  }

  const processSalesData = (stats: SaleData[], startDay: string, endDay: string, year: number) => {
    const startDate = dayjs(`${year}-${startDay}`)
    const endDate = dayjs(`${year}-${endDay}`)
    const totalDays = endDate.diff(startDate, 'day') + 1
    const salesData = new Array(totalDays).fill(0)
    const labels = new Array(totalDays).fill('').map((_, index) => {
      const currentDate = startDate.add(index, 'day')

      return currentDate.format('MM/DD')
    })

    stats.forEach(sale => {
      const saleDate = dayjs(sale.full_date)
      const dayIndex = saleDate.diff(startDate, 'day')
      if (dayIndex >= 0 && dayIndex < totalDays) {
        salesData[dayIndex] = sale.total_sales
      }
    })

    return { salesData, labels }
  }

  const processWeeklyData = (stats: SaleData[], startDay: string, endDay: string, year: number) => {
    const startDate = dayjs(`${year}-${startDay}`)
    const weeks: { [key: number]: number } = {}

    stats.forEach(sale => {
      const saleDate = dayjs(sale.full_date)
      const weekNumber = Math.floor(saleDate.diff(startDate, 'day') / 7) + 1

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = 0
      }
      weeks[weekNumber] += sale.total_sales
    })

    const organizedSales = new Array(5).fill(0)
    Object.entries(weeks).forEach(([week, amount]) => {
      const weekIndex = parseInt(week) - 1
      if (weekIndex >= 0 && weekIndex < 5) {
        organizedSales[weekIndex] = amount
      }
    })

    return {
      weekNumbers: Object.keys(weeks).map(Number),
      totalSales: Object.values(weeks),
      organizedSales
    }
  }

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      height: 100
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: true },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
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
        const date = dateLabels[dataPointIndex]
        const value = series[seriesIndex][dataPointIndex]

        return `
        <div class='bar-chart'>
        <span>Day ${dataPointIndex + 1} (${date}): $${value.toFixed(2)}</span>
          </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled },
        align: 'center' // Ensure y-axis labels are vertically centered
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },

      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31
      ]
    }
  }

  useEffect(() => {
    if (month) {
      fetchDailySales()
    }
  }, [month, username])

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
          <PickersMonthYear popperPlacement='auto-start' month={month} setMonth={setMonth} />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ApexChartWrapper>
            <ReactApexcharts type='bar' options={options} series={series} />
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
