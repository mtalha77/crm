import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { UserColumns } from './columns/userTableColumns'
import { Button } from '@mui/material'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import dayjs from 'dayjs'

function UserTable() {
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
        const res = await axios.get('/api/user/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })

        setData(res.data.payload.users)
      } catch (error) {
        console.log(error)
        toast.error('Network error. Please refresh the page')
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Users'
  })

  const handleExportData = () => {
    const rowData = data.map((d: any) => ({
      Department_Name: d.department_name,
      Name: d.user_name,
      Password: d.password,
      role: d.role,
      'creation Date': dayjs(d.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }))
    console.log('data', data)

    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  return (
    <>
      <Button variant='contained' onClick={handleExportData} disabled={isLoading || data.length === 0} sx={{ mb: 3 }}>
        Download CSV
      </Button>

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

export default UserTable
