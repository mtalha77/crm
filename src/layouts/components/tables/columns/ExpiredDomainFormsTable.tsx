import { useState, useMemo } from 'react'
import MuiTable from '../MuiTable'
import dayjs from 'dayjs'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Icon as MuiIcon, Box } from '@mui/material'
import ViewDomainFormDialog from '../../dialogs/ViewDomainFormDialog'
import UpdateDomainFormDialog from '../../dialogs/UpdateDomainFormDialog'
import toast from 'react-hot-toast'

const ExpiredDomainFormsTable = ({ data, isLoading }: any) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [dataa, setData] = useState<DomainFormType[]>([])

  type DomainFormType = {
    _id?: string
    creationDate: string
    domainName: string
    expirationDate: string
    price: string
    live_status: string
    list_status: string
    notes: string
    domainApprovedBy: string
  }

  // Define handleUpdateDomainForm
  const handleUpdateDomainForm = (updatedDomain: DomainFormType) => {
    setData(prevData => prevData.map(domain => (domain._id === updatedDomain._id ? updatedDomain : domain)))
    toast.success('Domain updated successfully')
  }

  const columns = useMemo(
    () => [
      {
        header: 'Domain Name',
        accessorKey: 'domain_name'
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
        header: 'Actions',
        accessorKey: 'actions',
        Cell: ({ cell }: any) => {
          const { _id } = cell.row.original

          return (
            <Box alignItems={'center'} display={'flex'}>
              <MuiIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedDomainId(_id)
                  setDialogOpen(true)
                }}
              >
                <VisibilityIcon />
              </MuiIcon>
              <UpdateDomainFormDialog
                updatedDomain={cell.row.original}
                handleUpdateDomainForm={handleUpdateDomainForm}
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
      {selectedDomainId && (
        <ViewDomainFormDialog _id={selectedDomainId} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      )}
    </>
  )
}

export default ExpiredDomainFormsTable
