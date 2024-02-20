import { FormControl, MenuItem, Select } from '@mui/material'
import { UserDataType } from 'src/context/types'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const businessTicketsColumns: any = (user: UserDataType, employees: any) => [
  {
    header: 'Business Name',
    accessorKey: 'business_id.business_name'
  },
  {
    header: 'Assignee Employee',
    accessorKey: 'assignee_id.user_name',
    Cell: ({ cell }: any) => {
      if (user.role === UserRole.TEAM_LEAD) {
        return (
          <>
            <FormControl>
              <Select defaultValue='' displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value=''>Not Assigned</MenuItem>
                {employees.map((e: any) => {
                  return (
                    <MenuItem key={e.user_name} value={e.user_name}>
                      {e.user_name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </>
        )
      }

      return cell.getValue()
    }
  },
  {
    header: 'Assignee Department',
    accessorKey: 'assignee_depart_name'
  },
  {
    header: 'Status',
    accessorKey: 'status'
  },
  {
    header: 'Action'
  }
]

export default businessTicketsColumns
