import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material'
import FormsHeader from '../../Header'
import BusinessDetails from '../../SharedField/BusinessDetails'
import SubmitButton from '../../SharedField/FormButton'
import SaleDepartment from '../../SharedField/SaleDepartment'
import TicketDetails from '../../SharedField/TicketDetails'
import DesignerSpecificDetails from './DesignerSpecificDetails'

const DesignerForm = (props: any) => {
  const { update } = props

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant='h5' color={'primary'}>
              {update ? 'Update Ticket' : ' Generate New Ticket For Designer'}
            </Typography>
          }
        />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <Stack spacing={6}>
            <FormsHeader title='Business Details'>
              <BusinessDetails update={update} />
            </FormsHeader>
            {!update && (
              <FormsHeader title='Sale Department'>
                <SaleDepartment />
              </FormsHeader>
            )}
            <FormsHeader title='Ticket Details'>
              <TicketDetails update={update} />
            </FormsHeader>

            <FormsHeader title='Department Specific Details'>
              <DesignerSpecificDetails />
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

export default DesignerForm
