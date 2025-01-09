import dayjs from 'dayjs' // Import dayjs

export const crmLogsTableColumns = [
  {
    header: 'Date',
    accessorKey: 'date',
    Cell: ({ cell }: any) => {
      const date = cell.getValue()

      return date ? dayjs(date).format('MM-DD-YYYY') : 'N/A' // Format date as "01-09-2025"
    }
  },
  {
    header: 'Time',
    accessorKey: 'time',
    Cell: ({ cell }: any) => {
      const date = cell.getValue()

      return date ? dayjs(date).format('h:mm:ss A') : 'N/A' // Format time as "2:54:33 AM"
    }
  },
  {
    header: 'Name',
    accessorKey: 'details.name', // Access the nested "name" field in "details"
    Cell: ({ cell }: any) => cell.getValue() || 'N/A'
  },
  {
    header: 'Department',
    accessorKey: 'details.department', // Access the nested "department" field in "details"
    Cell: ({ cell }: any) => cell.getValue() || 'N/A'
  },
  {
    header: 'IP Address',
    accessorKey: 'details.ip', // Access the nested "ip" field in "details"
    Cell: ({ cell }: any) => cell.getValue() || 'N/A'
  },
  {
    header: 'Information',
    accessorKey: 'msg', // Access the "msg" field directly
    Cell: ({ cell }: any) => cell.getValue() || 'N/A'
  }
]
