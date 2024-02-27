import { FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from 'next/router'
import { BusinessStatustValues } from 'src/shared/enums/BusinessStatus.enum'
import ViewBusinessDialog from '../../dialogs/ViewBusinessDialog'

function BusinessesColumns(handleEdit: any, updateStatus: any) {
  return [
    {
      header: 'Name',
      accessorKey: 'business_name'
    },
    {
      header: 'Email',
      accessorKey: 'business_email'
    },
    {
      header: 'Number',
      accessorKey: 'business_number'
    },
    {
      header: 'Status',
      accessorKey: 'status',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue() : ''
        const [value, setValue] = useState(defaultValue)

        return (
          <>
            <FormControl>
              <Select
                size='small'
                sx={{ fontSize: '14px' }}
                onChange={(e: any) => {
                  setValue(e.target.value)
                  updateStatus(_id, e.target.value)
                }}
                value={value}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {BusinessStatustValues.map((e: any) => {
                  return (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </>
        )
      }
    },
    {
      header: 'Action',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original

        return (
          <>
            <ViewBusinessDialog data={cell.row.original} />
            <Tooltip title='Edit'>
              <Icon style={{ marginLeft: 15, cursor: 'pointer' }} onClick={() => handleEdit(_id)}>
                <EditIcon />
              </Icon>
            </Tooltip>
          </>
        )
      }
    }
  ]
}

export default BusinessesColumns
