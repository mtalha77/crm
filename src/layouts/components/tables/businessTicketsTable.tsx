import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import businessTicketsColumns from './columns/businessTicketsTableColumns'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Department } from 'src/shared/enums/Department.enum'
import { mapFormPageRoutes } from 'src/constants'

function BusinessTicketsTable() {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Make both API requests concurrently
        const [usersResponse, dataResponse] = await Promise.all([
          axios.get('/api/user/get-employees-department-wise', {
            headers: { authorization: localStorage.getItem('token') }
          }),
          axios.get('/api/business-ticket/get-all', {
            headers: { authorization: localStorage.getItem('token') }
          })
        ])

        // Destructure the responses
        const { data: usersData } = usersResponse
        const { data: ticketsData } = dataResponse

        // Set the state for users and data
        setEmployees(usersData.payload.users)
        setData(ticketsData.payload.tickets)
      } catch (error) {
        console.error(error)
        toast.error('Network error. Please refresh the page.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const assignedEmployeeToTicket = async (user_name: string, ticketId: string) => {
    const userFound: any = employees.find((e: any) => e.user_name === user_name)

    try {
      const res: any = await axios.post(
        '/api/business-ticket/assign-to-employee',
        {
          ticketId,
          user_name,
          employee_id: userFound._id
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data)
    }
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const res: any = await axios.post(
        '/api/business-ticket/update-status',
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
    const page: string = mapFormPageRoutes[depart_name]

    router.push({
      pathname: page,
      query: { ticketId }
    })
  }

  const columns: any = useMemo(
    () => businessTicketsColumns(user, employees, assignedEmployeeToTicket, updateTicketStatus, handleTicketEdit),
    [employees]
  )

  return (
    <MuiTable
      data={data}
      columns={columns}
      options={{
        state: {
          isLoading: isLoading
        }
      }}
    />
  )
}

export default BusinessTicketsTable
