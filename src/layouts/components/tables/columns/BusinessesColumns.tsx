import { Icon, Tooltip } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from 'next/router'

function BusinessesColumns(handleEdit: any) {
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
      header: 'Action',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        return (
          <>
            <Tooltip title='View'>
              <Icon style={{ cursor: 'pointer' }}>
                <VisibilityIcon />
              </Icon>
            </Tooltip>
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
