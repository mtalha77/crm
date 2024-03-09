import EditIcon from '@mui/icons-material/Edit'
import { FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import { useState } from 'react'
import { UserDataType } from 'src/context/types'
import { DepartmentValues } from 'src/shared/enums/Department.enum'
import { TicketStatusValues } from 'src/shared/enums/TicketStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import ViewTicketDialog from '../../dialogs/ViewTicketDialog'
import moment from 'moment'

const FronterSheetColumns: any = (
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
      header: 'Date',
      accessorKey: 'createdAt',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()
        const { _id } = cell.row.original
        return moment(value).format('D MMMM YYYY')
      }
    },
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      filterVariant: 'autocomplete',
      filterSelectOptions: businessList
    },

    {
      header: 'Fronter',
      accessorKey: 'fronter_id.user_name'
    },
    {
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status'
    },
    {
      header: 'Payment',
      accessorKey: 'received_amount',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()
        const { _id } = cell.row.original
        return `$${value}`
      }
    }
  ]
}

export default FronterSheetColumns
