import { DepartmentValues } from 'src/shared/enums/Department.enum'

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
