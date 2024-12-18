import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField

  // IconButton
} from '@mui/material'
import { CheckCircle } from '@mui/icons-material' // Import the icons
import { useEffect, useState } from 'react'
import { UserDataType } from 'src/context/types'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import CreateChildTicketDialog from '../../dialogs/CreateChildTicketDialog'
import { PriorityTypeValues } from 'src/shared/enums/PriorityType.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'
import dayjs from 'dayjs'
import { getPriorityColor } from 'src/utils/helpers/getPriorityColor'
import { useRouter } from 'next/navigation'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios';

// import axios from 'axios'
// import { toast } from 'react-hot-toast'

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

const businessTicketsColumns: any = (
  user: UserDataType,
  employees: any,
  assignedEmployeeToTicket: any,
  updateTicketStatus: any,
  handleTicketEdit: any,
  ViewPaymentHistory: any,
  businessList: any,
  employeesList: any

  // fetchData: any // Add fetchData function to refresh data after deletion
) => {
  // const handleDelete = async (ticketId: string) => {
  //   try {
  //     await axios.delete(`/api/business-ticket/delete-business-ticket`, {
  //       headers: { authorization: localStorage.getItem('token') },
  //       data: { ticketId }
  //     })
  //     toast.success('Ticket and associated data deleted successfully')
  //     fetchData() // Refresh data after deletion
  //   } catch (error) {
  //     console.error(error)
  //     toast.error('Failed to delete ticket. Please try again.')
  //   }
  // }

  const columns = [
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
          router.push(`/ticket-comments/${rowData._id}`)
        }

        const fetchBusinessTicketNotifications = async (ticketId) => {
          try {
            const res = await axios.post('/api/user/get-ticket-unread-messages', {ticketId}, {
              headers: { authorization: localStorage.getItem('token') }
            })

            return res.data?.payload?.unreadMessages.length || 0
          } catch (error) {
            console.error(error)
          }
        }

        useEffect(() => {
          // Method to check for unseen messages or notifications
          const checkForNotifications = async () => {
            // Replace with your logic to determine badge visibility
            const hasNotifications = await fetchBusinessTicketNotifications(cell.row.original._id)
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
        const { _id } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue().map((v: any) => v.user_name) : []
        const [value, setValue] = useState(defaultValue)
        if (user.role === UserRole.TEAM_LEAD) {
          return (
            <>
              <FormControl fullWidth>
                <Select
                  size='small'
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 250 }}>
            {defaultValue &&
              defaultValue.map((v: any) => {
                return (
                  <Chip
                    key={v}
                    label={v}
                    sx={{ m: 0.75 }}
                    style={{ borderRadius: '8px' }}
                    color='primary'
                    size='small'
                  />
                )
              })}
          </Box>
        )
      }
    },
    {
      header: 'Assignee Department',
      accessorKey: 'assignee_depart_name',
      filterVariant: 'multi-select',
      filterSelectOptions: DepartmentValues,
      muiFilterTextFieldProps: { placeholder: 'Filter by depart.' }
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

        return cell.getValue() ? cell.getValue() : ''
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

    // {
    //   header: 'Due Date',
    //   accessorFn: (originalRow: any) => dayjs(originalRow.due_date),
    //   filterVariant: 'date',
    //   accessorKey: 'due_date',
    //   filterFn: (row: any, _columnIds: any, filterValue: any) => {
    //     return filterValue.isSame(row.getValue('due_date'), 'day')
    //   },
    //   Cell: ({ cell }: any) => {
    //     const value = cell.getValue()

    //     return dayjs(value).format('l')
    //   }
    // },

    {
      header: 'Reporting Date',
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
      header: 'Creation Date',
      accessorFn: (originalRow: any) => dayjs(originalRow.createdAt),
      filterVariant: 'date-range',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return dayjs(value).format('l')
      }
    },
    ...(user.role === UserRole.ADMIN || user.role === UserRole.SALE_MANAGER
      ? [
          {
            header: 'Other Sales',
            accessorKey: 'otherSales',
            Cell: ({ cell }: any) => {
              const value = cell.getValue()

              return value?.toString() === 'true' ? <CheckCircle style={{ color: 'green' }} /> : ''
            }
          }
        ]
      : []),
    {
      header: 'Payment',
      accessorKey: 'payment_history',
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
      Cell: ({ cell }: any) => {
        const { assignee_depart_name, _id, business_id } = cell.row.original

        const handleEdit = () => {
          handleTicketEdit(assignee_depart_name, _id)
        }

        return (
          <Box alignItems={'center'} display={'flex'}>
            <ViewTicketDialog ticketId={_id} depart={assignee_depart_name} />
            {user?.role !== UserRole.EMPLOYEE && (
              <>
                <CreateChildTicketDialog parentId={_id} businessId={business_id?._id} handleEdit={handleEdit} />

                {/* <IconButton onClick={() => handleDelete(_id)}>
                  <Delete />
                </IconButton> */}
              </>
            )}
          </Box>
        )
      }
    }
  ]

  return columns
}

export default businessTicketsColumns
