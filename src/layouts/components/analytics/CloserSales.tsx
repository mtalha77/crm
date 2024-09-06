// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import { Box } from '@mui/material'
import TopClosersTable from '../tables/TopClosersTable'
import PickersRange from '../datePickers/RangePicker'

dayjs.extend(utc)

const CloserSalesChart = () => {
  // ** Hook
  const theme = useTheme()
  const [series, setSeries] = useState<any>([
    {
      data: []
    }
  ])
  const [categories, setCategories] = useState([])
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(dayjs().subtract(31, 'day').toDate())
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const fetchMonthlySales = async (newStartDate = startDate, newEndDate = endDate) => {
    // Check if both dates are valid
    if (!newStartDate || !newEndDate) {
      console.log('Invalid dates selected for fetching daily sales')

      return
    }

    try {
      setIsLoading(true)
      const res = await axios.get(`/api/stats/get-top-closers?startDate=${startDate}&endDate=${endDate}`, {
        headers: { authorization: localStorage.getItem('token') }
      })

      const temp: any = []
      const newCategories: any = []
      const tempData: any = []

      let index = 0
      res.data.payload.stats.forEach((s: any) => {
        if (index < 5) {
          temp.push(s.total_sales)
          newCategories.push(s.user_name)
        }
        index++
        tempData.push({ ...s, index })
      })
      setSeries([
        {
          data: temp
        }
      ])
      setData(tempData)

      setCategories(newCategories)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  useEffect(() => {
      fetchMonthlySales()
  }, [])

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)

    // Validate the date range
    if (start && end) {
      const diff = dayjs(end).diff(dayjs(start), 'day')
      if (diff > 31) {
        toast.error('You can select at most 31 days at once')
      } else {
        // Call fetchDailySales when both dates are selected and valid
        fetchMonthlySales(start, end)
      }
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
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ff9f43']
      },
      background: {
        enabled: true,
        dropShadow: { enabled: false }
      }
    },
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
      categories: categories
    }
  }

  return (
    <Card sx={{ minWidth: '600px' }}>
      <CardHeader
        title='Top Closers'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Box display='flex' alignItems='center' gap={2} paddingLeft={'16px'}>
          <PickersRange
            popperPlacement='auto-start'
            handleDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <ApexChartWrapper>
          <ReactApexcharts type='bar' height={400} options={options} series={series} />
        </ApexChartWrapper>
        <Box sx={{ mt: 10 }}></Box>
        <Box>
          <TopClosersTable data={data} isLoading={isLoading} month={dayjs(endDate).format('MMMM YYYY')} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CloserSalesChart
