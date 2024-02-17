export const userColumns: any = () => [
  {
    header: 'Username',
    accessorKey: 'user_name'
  },
  {
    header: 'Password',
    accessorKey: 'password'
  },
  {
    header: 'Department',
    accessorKey: 'department_name'
  },
  {
    header: 'Role',
    accessorKey: 'role',
    Cell: ({ cell, row }: any) => {
      return row.original?.sub_role ? cell.getValue() + ` (${row.original?.sub_role})` : cell.getValue()
    }
  },
  {
    header: 'Action'
  }
]
