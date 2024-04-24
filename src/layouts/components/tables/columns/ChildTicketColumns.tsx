import { Tooltip } from '@mui/material'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'

const ChildTicketsColumns: any = () =>
  // user: UserDataType,
  // employees: any,
  // assignedEmployeeToTicket: any,
  // updateTicketStatus: any,
  // handleTicketEdit: any,
  // businessList: any,
  // handleView: any

  {
    return [
      {
        header: 'Assignee Department',
        accessorKey: 'child_id.assignee_depart_name',
        filterVariant: 'multi-select',
        filterSelectOptions: DepartmentValues
      },
      {
        header: 'Status',
        accessorKey: 'child_id.status',
        Cell: ({ cell }: any) => {
          return cell.getValue() ? cell.getValue() : 'Not Assigned'
        }
      },
      {
        header: 'Priority',
        accessorKey: 'child_id.priority'
      },

      {
        header: 'Action',
        Cell: ({ cell }: any) => {
          const { assignee_depart_name, _id } = cell.row.original.child_id

          return (
            <>
              <Tooltip title='Edit'>
                <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} departmentalTicket={true} />
              </Tooltip>
            </>
          )
        }
      }
    ]
  }

export default ChildTicketsColumns
