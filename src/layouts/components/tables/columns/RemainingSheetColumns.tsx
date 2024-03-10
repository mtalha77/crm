import moment from 'moment'

const RemainingSheetColumns: any = (businessList: any) => {
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
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status'
    },
    {
      header: 'Remaining Balance',
      accessorKey: 'remaining_payment',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return `$${value}`
      }
    }
  ]
}

export default RemainingSheetColumns
