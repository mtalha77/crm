import UpdateUserDialog from '../../dialogs/UpdateUserDialog'

export const UserColumns: any = (handleUpdateUser: any) => [
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
    accessorKey: 'role'
  },
  {
    header: 'Access Level',
    accessorKey: 'globalAccess',
    Cell: ({ cell }: any) => {
      const value = cell.getValue() // Get the value of globalAccess

      return value === true ? 'Global' : 'Local'
    }
  },
  {
    header: 'Action',
    Cell: ({ cell }: any) => {
      return <UpdateUserDialog userDetails={cell.row.original} handleUpdateUser={handleUpdateUser} />
    }
  }
]
