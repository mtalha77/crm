import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import MuiTable from './MuiTable'
import BusinessesColumns from './columns/BusinessesColumns'

function BusinessesTable() {
  const [data, setData] = useState([])
  const [isLoading] = useState(false)
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
            density: 'compact'
            // columnVisibility: {
            //   status: !(user?.role === UserRole.TEAM_LEAD)
            // }
          }
        }}
      />
    </>
  )
}

export default BusinessesTable
