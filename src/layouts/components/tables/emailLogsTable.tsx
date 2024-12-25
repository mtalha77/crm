import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import emailLogsTableColumns from './columns/emailLogsTableColumns'

function EmailLogsTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchEmailLogs = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/email-logs/logs', {
        headers: { authorization: localStorage.getItem('token') }
      })

      // Use the correct path from the response
      setData(response.data.logs)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch email logs.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEmailLogs()
  }, [])

  const columns = emailLogsTableColumns()

  return (
    <MuiTable
      data={data}
      columns={columns}
      options={{
        state: {
          isLoading
        },
        initialState: {
          density: 'compact'
        }
      }}
    />
  )
}

export default EmailLogsTable
