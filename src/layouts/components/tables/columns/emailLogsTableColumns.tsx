import {
  Box,
  Chip

  // IconButton
} from '@mui/material'

const emailLogsTableColumns = () => {
  const columns = [
    {
      header: 'Business Name',
      accessorKey: 'business_name',
      Cell: ({ cell }: any) => cell.getValue() || 'External Contact'
    },
    {
      header: 'Business Email',
      accessorKey: 'email'
    },
    {
      header: 'Templates',
      accessorKey: 'templates',
      Cell: ({ cell }: any) => {
        const templates = cell.getValue() || []

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {templates.map((template: any, index: number) => (
              <Chip
                key={index}
                label={`${template.template_name} (${new Date(template.sent_at).toLocaleDateString()})`}
                variant='outlined'
                color='primary'
                size='small'
              />
            ))}
          </Box>
        )
      }
    }
  ]

  return columns
}

export default emailLogsTableColumns
