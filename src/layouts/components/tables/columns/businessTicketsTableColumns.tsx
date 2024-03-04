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
import CreateChildTicketDialog from '../../dialogs/CreateChildTicketDialog'

const businessTicketsColumns: any = (
  user: UserDataType,
  employees: any,
  assignedEmployeeToTicket: any,
  updateTicketStatus: any,
  handleTicketEdit: any,
  fetchAgain: any,
  businessList: any,
  handleView: any
) => {
  return [
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      filterVariant: 'autocomplete',
      filterSelectOptions: businessList
    },

    {
      header: 'Assignee Employee',
      accessorKey: 'assignee_employee_id.user_name',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue() : ''
        const [value, setValue] = useState(defaultValue)
        if (user.role === UserRole.TEAM_LEAD) {
          return (
            <>
              <FormControl>
                <Select
                  size='small'
                  sx={{ fontSize: '14px' }}
                  onChange={e => {
                    assignedEmployeeToTicket(e.target.value, _id)
                    setValue(e.target.value)
                  }}
                  // defaultValue=''
                  value={value}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''>Not Assigned</MenuItem>
                  {employees.map((e: any) => {
                    return (
                      <MenuItem key={e.user_name} value={e.user_name}>
                        {e.user_name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </>
          )
        }

        return cell.getValue() ? cell.getValue() : 'Not Assigned'
      }
    },

    {
      header: 'Assignee Department',
      accessorKey: 'assignee_depart_name',
      filterVariant: 'multi-select',
      filterSelectOptions: DepartmentValues
    },
    {
      header: 'Status',
      accessorKey: 'status',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue() : ''
        const [value, setValue] = useState(defaultValue)
        if (user.role === UserRole.TEAM_LEAD || user.role === UserRole.ADMIN) {
          return (
            <>
              <FormControl>
                <Select
                  size='small'
                  sx={{ fontSize: '14px' }}
                  onChange={e => {
                    setValue(e.target.value)
                    updateTicketStatus(_id, e.target.value)
                  }}
                  // defaultValue=''
                  value={value}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {TicketStatusValues.map((e: any) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </>
          )
        }

        return cell.getValue() ? cell.getValue() : 'Not Assigned'
      }
    },
    {
      header: 'Priority',
      accessorKey: 'priority'
    },
    {
      header: 'Payment',
      accessorKey: 'payment_history',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()
        const { _id } = cell.row.original
        return (
          <>
            <PaymentHistoryDialog payment_history={value} ticketId={_id} fetchAgain={fetchAgain} />
          </>
        )
      }
    },
    {
      header: 'Action',
      Cell: ({ cell }: any) => {
        const { assignee_depart_name, _id, business_id } = cell.row.original
        return (
          <>
            <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} />
            {user?.role !== UserRole.EMPLOYEE && (
              <>
                <Tooltip title='Edit'>
                  <Icon
                    style={{ marginLeft: 15, cursor: 'pointer' }}
                    onClick={() => handleTicketEdit(assignee_depart_name, _id)}
                  >
                    <EditIcon />
                  </Icon>
                </Tooltip>
                <CreateChildTicketDialog parentId={_id} businessId={business_id?._id} />
              </>
            )}
          </>
        )
      }
    }
  ]
}

export default businessTicketsColumns
