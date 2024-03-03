import { Button, FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import { useState } from 'react'
import { UserDataType } from 'src/context/types'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Link from 'next/link'
import PaymentHistoryDialog from '../../dialogs/PaymentHistoryDialog'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'

const ChildTicketsColumns: any = (
  user: UserDataType,
  employees: any,
  assignedEmployeeToTicket: any,
  updateTicketStatus: any,
  handleTicketEdit: any,
  businessList: any,
  handleView: any
) => {
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
    }

    // {
    //   header: 'Action',
    //   Cell: ({ cell }: any) => {
    //     const { assignee_depart_name, _id } = cell.row.original
    //     return (
    //       <>
    //         <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} departmentalTicket={true} />
    //         <Tooltip title='Edit'>
    //           <Icon
    //             style={{ marginLeft: 15, cursor: 'pointer' }}
    //             onClick={() => handleTicketEdit(assignee_depart_name, _id)}
    //           >
    //             <EditIcon />
    //           </Icon>
    //         </Tooltip>
    //       </>
    //     )
    //   }
    // }
  ]
}

export default ChildTicketsColumns
