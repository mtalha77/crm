import React from 'react'
import FormsHeader from '../../Header'
import SaleDepartment from '../../SharedField/SaleDepartment'
import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material'
import SubmitButton from '../../SharedField/FormButton'
import BusinessDetails from '../../SharedField/BusinessDetails'
import TicketDetails from '../../SharedField/TicketDetails'
import PaidMarketingSpecificDetails from './PaidMarketingSpecificDetails'

const PaidMarketingForm = (props: any) => {
  const { update } = props
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant='h5' color={'primary'}>
              Generate New Ticket For Paid Marketing
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <Stack spacing={6}>
            <FormsHeader title='Business Details'>
              <BusinessDetails update={update} />
            </FormsHeader>

            <FormsHeader title='Sale Department'>
              <SaleDepartment />
            </FormsHeader>

            <FormsHeader title='Ticket Details'>
              <TicketDetails update={update} />
            </FormsHeader>

            <FormsHeader title='Department Specific Details'>
              <PaidMarketingSpecificDetails />
            </FormsHeader>
          </Stack>

          <Box sx={{ my: '2rem ' }} />

          <SubmitButton
            beforeText={update ? 'Update' : 'Submit'}
            afterText={update ? 'Updating' : 'Submitting'}
            fullWidth
            variant='contained'
          />
        </CardContent>
      </Card>
    </>
  )
}

export default PaidMarketingForm
