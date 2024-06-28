import { useState, useMemo } from 'react'
import MuiTable from '../MuiTable'
import dayjs from 'dayjs'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Icon as MuiIcon, Box } from '@mui/material'
import UpdateHostingFormDialog from '../../dialogs/UpdateHostingFormDialog'
import ViewHostingFormDialog from '../../dialogs/ViewHostingFormDialog'

const ExpiredHostingFormsTable = ({ data, setData, isLoading }: any) => {
  const [selectedHostingId, setSelectedHostingId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  type HostingFormType = {
    _id?: string
    creationDate: string
    hostingName: string
    expirationDate: string
    price: string
    live_status: string
    list_status: string
    notes: string
    hostingApprovedBy: string
  }

  // Define handleUpdateHostingForm
  const handleUpdateHostingForm = (updatedHosting: HostingFormType) => {
    setData((prevData: HostingFormType[]) =>
      prevData.map(hosting => (hosting._id === updatedHosting._id ? updatedHosting : hosting))
    )
  }

  const columns = useMemo(
    () => [
      {
        header: 'Hosting Name',
        accessorKey: 'hosting_name'
      },
      {
        header: 'Expiration Date',
        accessorKey: 'expiration_date',
        Cell: ({ cell }: any) => {
          const value = cell.getValue()

          return value ? dayjs(value).format('l') : ''
        }
      },
      {
        header: 'Price',
        accessorKey: 'price'
      },
      {
        header: 'Status',
        accessorKey: 'live_status'
      },
      {
        header: 'List Status',
        accessorKey: 'list_status'
      },
      {
        header: 'Hosting Holder',
        accessorKey: 'hosting_holder'
      },
      {
        header: 'Hosting Platform',
        accessorKey: 'hosting_platform'
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        Cell: ({ cell }: any) => {
          const { _id } = cell.row.original

          return (
            <Box alignItems={'center'} display={'flex'}>
              <MuiIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedHostingId(_id)
                  setDialogOpen(true)
                }}
              >
                <VisibilityIcon />
              </MuiIcon>
              <UpdateHostingFormDialog
                updatedHosting={cell.row.original}
                handleUpdateHostingForm={handleUpdateHostingForm}
              />
            </Box>
          )
        }
      }
    ],
    [data]
  )

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          enableColumnFilters: false,
          state: {
            isLoading: isLoading
          },
          initialState: {
            density: 'compact',
            showGlobalFilter: true
          }
        }}
      />
      {selectedHostingId && (
        <ViewHostingFormDialog _id={selectedHostingId} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      )}
    </>
  )
}

export default ExpiredHostingFormsTable
