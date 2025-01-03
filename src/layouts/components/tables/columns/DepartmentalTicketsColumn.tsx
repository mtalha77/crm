import EditIcon from '@mui/icons-material/Edit'
import {
  Autocomplete,
  Badge,
  Box,
  Checkbox,
  Chip,
  FormControl,
  Icon as MIcon,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from '@mui/material'
import { useEffect, useState } from 'react'
import { UserDataType } from 'src/context/types'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'
import dayjs from 'dayjs'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'
import { getPriorityColor } from 'src/utils/helpers/getPriorityColor'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Icon from 'src/@core/components/icon'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}
const DepartmentalTicketsColumns: any = (
  user: UserDataType,
  employees: any,
  assignedEmployeeToTicket: any,
  updateTicketStatus: any,
  handleTicketEdit: any,
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
      header: 'Client Name',
      accessorKey: 'business_id.client_name'
    },

    {
      header: 'Chat',
      accessorKey: 'chat',
      Cell: ({ cell }) => {
        const router = useRouter()
        const [isBadgeVisible, setBadgeVisible] = useState(0)

        const navigateToChatPage = () => {
          const rowData = cell.row.original // Access the full row data here
          router.push(`/department-ticket-comments/${rowData._id}`)
        }

        const fetchDepartmentTicketNotifications = async ticketId => {
          try {
            const res = await axios.post(
              '/api/user/get-department-ticket-unread-messages',
              { ticketId },
              {
                headers: { authorization: localStorage.getItem('token') }
              }
            )

            return res.data?.payload?.unreadMessages.length || 0
          } catch (error) {
            console.error(error)
          }
        }

        useEffect(() => {
          // Method to check for unseen messages or notifications
          const checkForNotifications = async () => {
            // Replace with your logic to determine badge visibility
            const hasNotifications = await fetchDepartmentTicketNotifications(cell.row.original._id)
            setBadgeVisible(hasNotifications)

          }

          checkForNotifications()
        }, [cell.row.original._id])

        return (

          // <IconButton onClick={navigateToChatPage}>
          //   <MessageRoundedIcon />
          // </IconButton>
          <IconButton color='inherit' aria-haspopup='true' onClick={navigateToChatPage} aria-controls='customized-menu'>
            <Badge
              color='error'
              variant='dot'
              invisible={!isBadgeVisible}
              sx={{
                '& .MuiBadge-badge': {
                  top: 4,
                  right: 4,
                  boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
                }
              }}
            >
              <Icon icon='hugeicons:message-notification-01' />
            </Badge>
          </IconButton>
        )
      }
    },

    {
      header: 'Work Status',
      accessorKey: 'work_status'
    },
    {
      header: 'Assignee Employees',
      accessorKey: 'assignee_employees',
      Filter: ({ header }: any) => {
        return (
          <Autocomplete
            onChange={(e: any, value: any) => {
              if (value.length <= 0) {
                header.column.setFilterValue(undefined)
              } else header.column.setFilterValue(value)
            }}
            multiple
            disableCloseOnSelect
            options={employeesList}
            id='autocomplete-checkboxes'
            getOptionLabel={(option: any) => option}
            renderInput={params => <TextField {...params} placeholder='Filter By Employees' variant='standard' />}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} sx={{ mr: 2 }} />
                {option}
              </li>
            )}
          />
        )
      },
      filterSelectOptions: employeesList,
      muiFilterTextFieldProps: { placeholder: 'Filter by Employee' },
      size: user.role === UserRole.TEAM_LEAD ? 300 : 180,
      filterFn: (row: any, _columnIds: any, filterValue: any) => {
        if (filterValue.length <= 0) {
          return true
        }
        if (!row.getValue('assignee_employees')) return false

        return filterValue.every((name: string) =>
          row.getValue('assignee_employees').some((obj: any) => obj.user_name === name)
        )
      },
      Cell: ({ cell }: any) => {
        const { _id, created_by } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue().map((v: any) => v.user_name) : []

        const [value, setValue] = useState(defaultValue)
        if (user.role === UserRole.TEAM_LEAD && created_by !== user._id) {
          return (
            <>
              <FormControl fullWidth>
                <Select
                  size='small'
                  sx={{ width: 270 }}
                  multiple
                  value={value}
                  MenuProps={MenuProps}
                  id='demo-multiple-chip'
                  onChange={(e: any) => {
                    setValue(e.target.value)
                    assignedEmployeeToTicket(e.target.value, _id)
                  }}
                  labelId='demo-multiple-chip-label'
                  renderValue={selected => {
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {(selected as unknown as string[]).map((value: any) => (
                          <Chip
                            style={{ borderRadius: '8px' }}
                            color='primary'
                            size='small'
                            key={value}
                            label={value}
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </Box>
                    )
                  }}
                >
                  {employees.map((name: any) => (
                    <MenuItem key={name.user_name} value={name.user_name}>
                      {name.user_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )
        }

        return (
          defaultValue &&
          defaultValue.map((v: any) => {
            return (
              <Chip key={v} label={v} sx={{ m: 0.75 }} style={{ borderRadius: '8px' }} color='primary' size='small' />
            )
          })
        )
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
      filterVariant: 'autocomplete',
      filterSelectOptions: TicketStatusValues,
      size: 200,

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
      size: 120,
      Cell: ({ cell }: any) => {
        const color: any = getPriorityColor(cell.getValue())

        return (
          <Chip style={{ borderRadius: '8px', backgroundColor: color, fontWeight: 'bold' }} label={cell.getValue()} />
        )
      }
    },

    {
      header: 'Due Date',

      accessorFn: (originalRow: any) => dayjs(originalRow.due_date),

      filterVariant: 'date',
      accessorKey: 'due_date',
      filterFn: (row: any, _columnIds: any, filterValue: any) => {
        return filterValue.isSame(row.getValue('due_date'), 'day')
      },
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return dayjs(value).format('l')
      }
    },

    {
      header: 'Action',
      Cell: ({ cell }: any) => {
        const { assignee_depart_name, _id } = cell.row.original

        return (
          <>
            <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} departmentalTicket={true} />
            {user?.role === UserRole.ADMIN && (
              <Tooltip title='Edit'>
                <MIcon
                  style={{ marginLeft: 15, cursor: 'pointer' }}
                  onClick={() => handleTicketEdit(assignee_depart_name, _id)}
                >
                  <EditIcon />
                </MIcon>
              </Tooltip>
            )}
          </>
        )
      }
    }
  ]
}

export default DepartmentalTicketsColumns
