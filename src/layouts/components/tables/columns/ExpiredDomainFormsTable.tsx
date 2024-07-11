import { useState, useMemo } from 'react'
import MuiTable from '../MuiTable'
import dayjs from 'dayjs'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Icon as MuiIcon, Box } from '@mui/material'
import ViewDomainFormDialog from '../../dialogs/ViewDomainFormDialog'
import UpdateDomainFormDialog from '../../dialogs/UpdateDomainFormDialog'

const ExpiredDomainFormsTable = ({ data, setData, isLoading }: any) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  type DomainFormType = {
    _id?: string
    creationDate: string
    domainName: string
    businessName: string
    expirationDate: string
    price: string
    live_status: string
    list_status: string
    notes: string
    domainApprovedBy: string
  }

  // Define handleUpdateDomainForm
  const handleUpdateDomainForm = (updatedDomain: DomainFormType) => {
    setData((prevData: DomainFormType[]) =>
      prevData.map(domain => (domain._id === updatedDomain._id ? updatedDomain : domain))
    )
  }

  const columns = useMemo(
    () => [
      {
        header: 'Domain Name',
        accessorKey: 'domain_name'
      },
      {
        header: 'Business Name', // Added Business Name column
        accessorKey: 'business_name'
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
        header: 'Domain Holder',
        accessorKey: 'domain_holder'
      },
      {
        header: 'Domain Platform',
        accessorKey: 'domain_platform'
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
