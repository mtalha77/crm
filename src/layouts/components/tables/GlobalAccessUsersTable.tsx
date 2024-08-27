import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { UserColumns } from './columns/userTableColumns'

function GlobalAccessUsersTable() {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateUser = (userDetails: any) => {
    const newData = data.map((d: any) => {
      if (d._id === userDetails._id) return userDetails

      return d
    })

    setData(newData)
  }

  const columns: any = useMemo(() => UserColumns(handleUpdateUser), [data])
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('/api/user/get-all-global', { headers: { authorization: localStorage.getItem('token') } })

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

export default GlobalAccessUsersTable
