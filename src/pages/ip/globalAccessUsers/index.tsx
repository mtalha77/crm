import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import GlobalAccessUsersTable from 'src/layouts/components/tables/GlobalAccessUsersTable'

function Index() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4' sx={{ mb: 5, mt: 20 }}>
          Global Access Users Table
        </Typography>

        <Link href={'/users/view-users/'} passHref>
          <Button variant='contained' sx={{ mb: 5, mt: 20 }}>
            Add more users
          </Button>
        </Link>
      </Box>

      <GlobalAccessUsersTable />
    </>
  )
}

export default Index
