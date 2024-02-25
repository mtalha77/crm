import React, { useEffect, useMemo, useState } from 'react'
import MuiTable from './MuiTable'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import axios from 'axios'
import BusinessesColumns from './columns/BusinessesColumns'

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
  const columns: any = useMemo(() => BusinessesColumns(handleEdit), [data])

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
          }
        }}
      />
    </>
  )
}

export default BusinessesTable
