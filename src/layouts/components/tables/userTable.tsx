import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { userColumns } from './columns/userTableColumns'

function UserTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const columns: any = useMemo(() => userColumns(), [])
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('/api/user/get-all', { headers: { authorization: localStorage.getItem('token') } })

        setData(res.data.payload.users)
      } catch (error) {
        console.log(error)
        toast.error('Network error. PLease refresh page')
      } finally {
        setIsLoading(false)
      }
    }
    getData()
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

export default UserTable
