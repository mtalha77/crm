// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import PickersMonthYear from 'src/layouts/components/datePickers/MonthPicker'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import WeeklySalesChart from './WeeklySales'
import utc from 'dayjs/plugin/utc'
import PickersRange from '../datePickers/RangePicker'

const DailySalesChart = ({ username }: any) => {
  // ** Hook
  dayjs.extend(weekOfYear)
  dayjs.extend(utc)

  const theme = useTheme()
  const [series, setSeries] = useState<any>([
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ])
  const [month, setMonth] = useState<DateType>(new Date())
  const [total, setTotal] = useState(0)
  const [weekNumbers, setWeekNumbers] = useState<any>([])
  const [totalWeekSales, setTotalWeekSales] = useState<any>([])
  const [oTotalWeekSales, setOTotalWeekSales] = useState<any>([0, 0, 0, 0, 0])

  function groupSalesByWeek(data: any) {
    const groups: any = {}

    data.forEach((item: any) => {
      // Get the week number of the month for the current date
      const currentDate = dayjs(item.full_date)
      const weekNumber = Math.ceil(currentDate.date() / 7)

      // Check if the week number exists in the groups object
      if (!groups[weekNumber]) {
        // If the week number doesn't exist, initialize it with 0 total sales
        groups[weekNumber] = 0
      }

      // Add the total sales for the current item to the total_sales of the week
      groups[weekNumber] += item.total_sales
    })

    return groups
  }

  const fetchMonthlySales = async () => {
    const startDate = dayjs(month).startOf('month').toISOString()
    const endDate = dayjs(month).endOf('month').toISOString()

    try {
      let user_name
      if (username !== 'All') user_name = username

      const res = await axios.get(
        `/api/stats/get-daily-sales?startDate=${startDate}&user_name=${user_name}&endDate=${endDate}`,
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )

      const temp = new Array(31).fill(0)
      let totalAmount = 0
      res.data.payload.stats.forEach((s: any) => {
        temp[s.date - 1] = s.total_sales
        totalAmount = totalAmount + s.total_sales
      })
      setTotal(totalAmount)
      setSeries([
        {
          data: temp
        }
      ])

      const salesByWeek = groupSalesByWeek(res.data.payload.stats)
      const oTotalSales: any = new Array(5).fill(0)
      for (const key in salesByWeek) {
        if (Object.prototype.hasOwnProperty.call(salesByWeek, key)) {
          const numericKey = parseInt(key, 10)
          oTotalSales[numericKey - 1] = salesByWeek[key]
        }
      }
      const weekNumbers = Object.keys(salesByWeek).map(Number)
      const totalSales = Object.values(salesByWeek)
      setTotalWeekSales(totalSales)
      setWeekNumbers(weekNumbers)
      setOTotalWeekSales(oTotalSales)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  useEffect(() => {
    if (month) {
      fetchMonthlySales()
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
      custom(data: any) {
        return `<div class='bar-chart'  >
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}$</span>
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
        style: { colors: theme.palette.text.disabled }
      },
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31
      ]
    }
  }

  const [startDate, setStartDate] = useState<Date | null>(dayjs().subtract(31, 'day').toDate())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)

    // Validate the date range
    if (start && end) {
      const diff = dayjs(end).diff(dayjs(start), 'day')
      if (diff > 31) {
        toast.error('The difference between dates should be 31 days or less.')
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Daily Sales Report'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              Total: ${total}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        {/* <Box display='flex' alignItems='center' gap={2} paddingLeft={'16px'}>

          <PickersMonthYear popperPlacement='auto-start' month={month} setMonth={setMonth} />
          <PickersMonthYear popperPlacement='auto-start' month={month} setMonth={setMonth} />
        </Box> */}

        <Box display='flex' alignItems='center' gap={2} paddingLeft={'16px'}>
          <PickersRange
            popperPlacement='auto-start'
            handleDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>

        <ApexChartWrapper>
          <ReactApexcharts type='bar' options={options} series={series} />
          <WeeklySalesChart
            weekNumbers={weekNumbers}
            totalWeekSales={totalWeekSales}
            oTotalWeekSales={oTotalWeekSales}
          />
        </ApexChartWrapper>
      </CardContent>
    </Card>
  )
}

export default DailySalesChart
