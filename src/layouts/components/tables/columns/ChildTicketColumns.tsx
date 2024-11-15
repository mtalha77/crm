import { Badge, IconButton, Tooltip } from '@mui/material'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
        header: 'Chat',
        accessorKey: 'chat',
        Cell: ({ cell }) => {
          const router = useRouter()
          const [isBadgeVisible, setBadgeVisible] = useState(0)

          const navigateToChatPage = () => {
            const rowData = cell.row.original // Access the full row data here
            router.push(`/department-ticket-comments/${rowData.child_id._id}`)
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
              const hasNotifications = await fetchDepartmentTicketNotifications(cell.row.original.child_id._id)
              setBadgeVisible(hasNotifications)

              console.log('badgeVisible', hasNotifications)
            }

            checkForNotifications()
          }, [cell.row.original._id])

          return (
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
