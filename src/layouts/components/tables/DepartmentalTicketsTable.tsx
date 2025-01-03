import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { mapDFormPageRoutes } from 'src/constants'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import MuiTable from './MuiTable'
import DepartmentalTicketsColumns from './columns/DepartmentalTicketsColumn'

function DepartmentalTicketsTable() {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [businessList, setBusinessList] = useState([])
  const [employeesList, setEmployeesList] = useState([])
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

  const assignedEmployeeToTicket = async (users: string[], ticketId: string) => {
    const userIds: any = employees.filter((e: any) => users.includes(e.user_name)).map((e: any) => e._id)
    const mapped: any = employees
      .filter((e: any) => users.includes(e.user_name))
      .map((e: any) => {
        return { _id: e._id, user_name: e.user_name }
      })
    setData((): any => {
      return data.map((t: any) => {
        if (t._id === ticketId) {
          return {
            ...t,
            assignee_employees: mapped
          }
        } else {
          return t
        }
      })
    })

    axios
      .post(
        '/api/department-ticket/assign-to-employee',
        {
          ticketId,
          userIds
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then(() => {
        toast.success('Assignee Employee updated successfully')
      })
      .catch(() => {
        toast.error('Network error. Please refresh the page.')
      })
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    setData((): any => {
      return data.map((t: any) => {
        if (t._id === ticketId) {
          return {
            ...t,
            status
          }
        } else {
          return t
        }
      })
    })

    await axios
      .post(
        '/api/department-ticket/update-status',
        {
          ticketId,
          status
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then((res: any) => {
        toast.success(res.data.message)
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(error.response.data)
      })
  }

  const handleTicketEdit = (depart_name: Department, ticketId: string) => {
    const page: string = mapDFormPageRoutes[depart_name]
    router.push({
      pathname: page,
      query: { ticketId }
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
        businessList,
        employeesList
      ),
    [employees, businessList]
  )

  //

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
              ['assignee_employees']: !(user?.role === UserRole.EMPLOYEE),
              assignee_depart_name: !(user?.role === UserRole.EMPLOYEE || user?.role === UserRole.TEAM_LEAD)
            },
            columnFilters: [
              {
                id: 'status',
                value: status ? status : ''
              }
            ]
          }
        }}
      />
    </>
  )
}

export default DepartmentalTicketsTable
