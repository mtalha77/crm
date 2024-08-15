import { Box, Icon as MuiIcon } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import UpdateDomainFormDialog from 'src/layouts/components/dialogs/UpdateDomainFormDialog'

const DomainColumns = ({ setSelectedDomainId, setDomainDialogOpen, setDeleteDialogOpen, setDeleteTarget }: any) => {
  const { user } = useAuth()

  return [
    {
      header: 'Creation Date',
      accessorKey: 'creation_date',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return value ? new Date(value).toLocaleDateString() : ''
      }
    },
    {
      header: 'Domain Name',
      accessorKey: 'domain_name'
    },
    {
      header: 'Expiration Date',
      accessorKey: 'expiration_date',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return value ? new Date(value).toLocaleDateString() : ''
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
                setDomainDialogOpen(true)
              }}
            >
              <VisibilityIcon />
            </MuiIcon>
            <UpdateDomainFormDialog updatedDomain={cell.row.original} />
            {(user?.role === UserRole.ADMIN || user?.role === UserRole.ADMIN) && (
              <>
                <MuiIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => {
                    setSelectedDomainId(_id)
                    setDeleteTarget('domain')
                    setDeleteDialogOpen(true)
                  }}
                >
                  <DeleteIcon />
                </MuiIcon>
              </>
            )}
          </Box>
        )
      }
    }
  ]
}

export default DomainColumns
