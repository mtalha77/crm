import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import businessTicketsColumns from './columns/businessTicketsTableColumns'
import { useAuth } from 'src/hooks/useAuth'

function BusinessTicketsTable() {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const columns: any = useMemo(() => businessTicketsColumns(user, employees), [employees])
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
