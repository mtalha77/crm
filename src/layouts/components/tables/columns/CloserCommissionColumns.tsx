import dayjs from 'dayjs'

function CloserCommissionColumns() {
  return [
    {
      header: 'Due Date',
      accessorFn: (originalRow: any) => dayjs(originalRow.createdAt),
      accessorKey: 'createdAt',
      filterVariant: 'date-range',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return dayjs(value).format('l')
      }
    },
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      filterVariant: 'autocomplete',
      filterFn: 'equals'
    },
    {
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status',
      filterVariant: 'autocomplete',

      filterFn: 'equals'
    },
    {
      header: 'Sales Type',
      accessorKey: 'sales_type',
      filterVariant: 'autocomplete',

      filterFn: 'equals'
    },
    {
      header: 'Closer',
      accessorKey: 'closer_id.user_name',
      filterVariant: 'autocomplete',
      filterFn: 'equals'
    },
    {
      header: 'Payment Rec. ($)',
      accessorKey: 'received_payment'
    },
    {
      header: 'Commissionable Amount ($)',
      accessorKey: 'commissionAbleAmount',
      size: 230
    },
    {
      header: 'Commission Rate',
      accessorKey: 'commissionRate'
    },
    {
      header: 'Commission ($)',
      accessorKey: 'commission'
    }
  ]
}

export default CloserCommissionColumns
