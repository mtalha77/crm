import { UserDataType } from 'src/context/types'

import moment from 'moment'

const CloserSheetColumns: any = (
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
      header: 'Closer',
      accessorKey: 'closer_id.user_name'
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

export default CloserSheetColumns
