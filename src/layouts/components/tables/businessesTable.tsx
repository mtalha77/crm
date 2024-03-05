import React, { useEffect, useMemo, useState } from 'react'
import MuiTable from './MuiTable'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import axios from 'axios'
import BusinessesColumns from './columns/BusinessesColumns'
import toast from 'react-hot-toast'
import { UserRole } from 'src/shared/enums/UserRole.enum'

function BusinessesTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/api/business/get-all', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setData(res.data.payload.businesses)
    } catch (error) {
      console.error(error)
    }
  }
  const handleEdit = (businessId: string) => {
    router.push({
      pathname: '/business-update',
      query: { businessId }
    })
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res: any = await axios.post(
        '/api/business/update-status',
        {
          id,
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
  const columns: any = useMemo(() => BusinessesColumns(handleEdit, updateStatus, user), [data])

  useEffect(() => {
    fetchBusinesses()
  }, [])
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
            density: 'compact',
            columnVisibility: {
              status: !(user?.role === UserRole.TEAM_LEAD)
            }
          }
        }}
      />
    </>
  )
}

export default BusinessesTable
