const TopBusinessesColumns: any = () => {
  return [
    {
      header: 'Ranking',
      accessorKey: 'index'
    },
    {
      header: 'Business Name',
      accessorKey: 'business_name',
      filterFn: 'equals'
    },
    {
      header: 'Total Payment Received ($)',
      accessorKey: 'totalReceivedPayment'
    }
  ]
}

export default TopBusinessesColumns
