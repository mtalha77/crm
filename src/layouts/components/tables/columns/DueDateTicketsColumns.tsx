import { Box, Button, Chip } from '@mui/material'
import { UserDataType } from 'src/context/types'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

import { DepartmentValues } from 'src/shared/enums/Department.enum'
import CreateChildTicketDialog from '../../dialogs/CreateChildTicketDialog'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'
import dayjs from 'dayjs'
import { getPriorityColor } from 'src/utils/helpers/getPriorityColor'

const DueDateTicketsColumns: any = (
  user: UserDataType,

  handleTicketEdit: any,
  ViewPaymentHistory: any
) => {
  return [
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      size: 20
    },

    {
      header: 'Assignee Department',
      accessorKey: 'assignee_depart_name',
      filterVariant: 'multi-select',
      filterSelectOptions: DepartmentValues,
      muiFilterTextFieldProps: { placeholder: 'Filter by depart.' },
      size: 20
    },
    {
      header: 'Status',
      accessorKey: 'status',
      filterVariant: 'autocomplete',
      filterSelectOptions: TicketStatusValues,
      size: 20,

      Cell: ({ cell }: any) => {
        return cell.getValue() ? cell.getValue() : ''
      }
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      filterVariant: 'autocomplete',
      filterSelectOptions: PriorityTypeValues,
      size: 20,
      Cell: ({ cell }: any) => {
        const color: any = getPriorityColor(cell.getValue())

        return (
          <Chip style={{ borderRadius: '8px', backgroundColor: color, fontWeight: 'bold' }} label={cell.getValue()} />
        )
      }
    },
    {
      header: 'Reporting Date',
      size: 20,
      accessorFn: (originalRow: any) =>
        originalRow.client_reporting_date ? dayjs(originalRow.client_reporting_date) : '',
      filterVariant: 'date',
      accessorKey: 'client_reporting_date',
      filterFn: (row: any, _columnIds: any, filterValue: any) => {
        return filterValue.isSame(row.getValue('client_reporting_date'), 'day')
      },
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return value ? dayjs(value).format('l') : ''
      }
    },
    {
      header: 'Payment',
      accessorKey: 'payment_history',
      size: 20,
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original

        return (
          <>
            <Button
              sx={{ textTransform: 'none' }}
              variant='contained'
              size='small'
              onClick={() => ViewPaymentHistory(_id)}
            >
              Payment History
            </Button>
          </>
        )
      }
    },
    {
      header: 'Action',
      size: 20,
      Cell: ({ cell }: any) => {
        const { assignee_depart_name, _id, business_id } = cell.row.original
        const handleEdit = () => {
          handleTicketEdit(assignee_depart_name, _id)
        }

        return (
          <>
            <Box alignItems={'center'} display={'flex'}>
              <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} />
              {user?.role !== UserRole.EMPLOYEE && (
                <CreateChildTicketDialog parentId={_id} businessId={business_id?._id} handleEdit={handleEdit} />
              )}
            </Box>
          </>
        )
      }
    }
  ]
}

export default DueDateTicketsColumns
