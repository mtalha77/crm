import { Box, Button, FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { UserDataType } from 'src/context/types'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

import { DepartmentValues } from 'src/shared/enums/Department.enum'
import CreateChildTicketDialog from '../../dialogs/CreateChildTicketDialog'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'
import PaymentHistoryDialog from '../../dialogs/PaymentHistoryDialog'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'

const businessTicketsColumns: any = (
  user: UserDataType,
  employees: any,
  assignedEmployeeToTicket: any,
  updateTicketStatus: any,
  handleTicketEdit: any,
  ViewPaymentHistory: any,
  businessList: any,
  employeesList: any
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
      filterVariant: 'autocomplete',
      filterSelectOptions: employeesList,
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
      filterSelectOptions: DepartmentValues,
      muiFilterTextFieldProps: { placeholder: 'Filter by department' }
    },
    {
      header: 'Status',
      accessorKey: 'status',
      filterVariant: 'autocomplete',
      filterSelectOptions: TicketStatusValues,

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
                    setValue(e.target.value)
                    updateTicketStatus(_id, e.target.value)
                  }}
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
      accessorKey: 'priority',
      filterVariant: 'autocomplete',
      filterSelectOptions: PriorityTypeValues,
      size: 120
    },
    {
      header: 'Payment',
      accessorKey: 'payment_history',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()
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

export default businessTicketsColumns
