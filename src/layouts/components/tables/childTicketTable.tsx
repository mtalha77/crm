import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { mapDFormPageRoutes, mapFormPageRoutes } from 'src/constants'
import { useAuth } from 'src/hooks/useAuth'
import { Department, DepartmentValues } from 'src/shared/enums/Department.enum'
import MuiTable from './MuiTable'
import businessTicketsColumns from './columns/businessTicketsTableColumns'
import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { TicketStatus, TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import DepartmentalTicketsColumns from './columns/DepartmentalTicketsColumn'
import ChildTicketsColumns from './columns/ChildTicketColumns'
let filteredData: any = []
function ChildTicketsTable({ cdata }: any) {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [businessList, setBusinessList] = useState([])

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/api/business/get-all-names', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setBusinessList(() => {
        return res.data?.payload?.businesses.map((b: any) => b.business_name)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const assignedEmployeeToTicket = async (user_name: string | 'Not Assigned', ticketId: string) => {
    const userFound: any = employees.find((e: any) => e.user_name === user_name)

    try {
      const res: any = await axios.post(
        '/api/department-ticket/assign-to-employee',
        {
          ticketId,
          user_name,
          employee_id: userFound?._id
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      toast.success(res.data?.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data)
    }
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const res: any = await axios.post(
        '/api/department-ticket/update-status',
        {
          ticketId,
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

  const handleTicketEdit = (depart_name: Department, ticketId: string) => {
    const page: string = mapDFormPageRoutes[depart_name]

    router.push({
      pathname: page,
      query: { ticketId }
    })
  }

  const handleView = (ticketId: string, department: string) => {
    router.push({
      pathname: '/view-ticket',
      query: { ticketId, depart: department }
    })
  }

  const columns: any = useMemo(
    () =>
      ChildTicketsColumns(
        user,
        employees,
        assignedEmployeeToTicket,
        updateTicketStatus,
        handleTicketEdit,
        businessList,
        handleView
      ),
    [employees, businessList]
  )

  return (
    <>
      <MuiTable
        data={cdata}
        columns={columns}
        options={{
          state: {
            isLoading: isLoading
          },
          enableColumnActions: false,
          enableColumnFilters: false,
          enablePagination: false,
          enableSorting: false,
          enableDensityToggle: false,
          enableFullScreenToggle: false,
          enableHiding: false
        }}
      />
    </>
  )
}

export default ChildTicketsTable
