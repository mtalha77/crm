const TopFrontersColumns: any = () => {
  return [
    {
      header: 'Ranking',
      accessorKey: 'index'
    },
    {
      header: 'Username',
      accessorKey: 'user_name',
      filterFn: 'equals'
    },
    {
      header: 'Total Sales ($)',
      accessorKey: 'total_sales'
    }
  ]
}

export default TopFrontersColumns
