import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { mapDFormPageRoutes, mapFormPageRoutes } from 'src/constants'
import { useAuth } from 'src/hooks/useAuth'
import { Department, DepartmentValues } from 'src/shared/enums/Department.enum'
import MuiTable from './MuiTable'
import businessTicketsColumns from './columns/businessTicketsTableColumns'
import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { TicketStatus, TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import DepartmentalTicketsColumns from './columns/DepartmentalTicketsColumn'
import { UserRole } from 'src/shared/enums/UserRole.enum'
let filteredData: any = []
function DepartmentalTicketsTable() {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [businessList, setBusinessList] = useState([])
  const [employeesList, setEmployeesList] = useState([])
  const dataRendered = useRef<boolean>(false)
  const { status } = router.query
  const fetchData = async () => {
    try {
      setIsLoading(true)

      // Make both API requests concurrently
      const [usersResponse, dataResponse] = await Promise.all([
        axios.get('/api/user/get-employees-department-wise', {
          headers: { authorization: localStorage.getItem('token') }
        }),
        axios.get('/api/department-ticket/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })
      ])

      // Destructure the responses
      const { data: usersData } = usersResponse
      const { data: ticketsData } = dataResponse

      // Set the state for users and data
      setEmployeesList(() => {
        return usersData.payload.users.map((b: any) => b.user_name)
      })
      setEmployees(usersData.payload.users)
      setData(ticketsData.payload.tickets)
    } catch (error) {
      console.error(error)
      toast.error('Network error. Please refresh the page.')
    } finally {
      setIsLoading(false)
    }
  }

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
    fetchData()
    fetchBusinesses()
  }, [])

  const fetchAgain = () => {
    fetchData()
  }

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
      DepartmentalTicketsColumns(
        user,
        employees,
        assignedEmployeeToTicket,
        updateTicketStatus,
        handleTicketEdit,
        fetchAgain,
        businessList,
        handleView,
        employeesList
      ),
    [employees, businessList]
  )

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
            columnVisibility: {
              ['assignee_employee_id.user_name']: !(user?.role === UserRole.EMPLOYEE),

              assignee_depart_name: !(user?.role === UserRole.EMPLOYEE || user?.role === UserRole.TEAM_LEAD)
            }
          },
          muiTableBodyCellProps: ({ column }: any) => {
            if (column.id === 'status') {
              if (dataRendered.current === false) {
                dataRendered.current = true
                if (!column.getIsFiltered()) if (status) column.setFilterValue(status)
              }
            }
          }
        }}
      />
    </>
  )
}

export default DepartmentalTicketsTable