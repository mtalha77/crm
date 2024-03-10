import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import MuiTable from './MuiTable'
import CloserSheetColumns from './columns/CloserSheetColumns'

function CloserSheetTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [businessList, setBusinessList] = useState([])
  const fetchData = async () => {
    try {
      setIsLoading(true)

      const res = await axios.get('/api/accounting/get-closer-sheet', {
        headers: { authorization: localStorage.getItem('token') }
      })

      setData(res.data.payload.paymentHistory)
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

  const columns: any = useMemo(() => CloserSheetColumns(businessList), [businessList])

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

export default CloserSheetTable
