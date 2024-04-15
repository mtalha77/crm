const TopServicesColumns: any = () => {
  return [
    {
      header: 'Ranking',
      accessorKey: 'index'
    },
    {
      header: 'Work Type',
      accessorKey: '_id',
      filterFn: 'equals'
    },
    {
      header: 'Total Payment Received ($)',
      accessorKey: 'totalReceivedPayment'
    }
  ]
}

export default TopServicesColumns
