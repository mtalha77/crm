import React from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { TextField, Grid, MenuItem, FormControl, FormHelperText, Select, InputLabel, Button } from '@mui/material'
import dayjs from 'dayjs'
import { date } from 'yup'

const DomainForm = () => {
  const methods = useForm({
    defaultValues: {
      domainName: '',
      creationDate: dayjs().format('YYYY-MM-DD'),
      expirationDate: dayjs().format('YYYY-MM-DD'),
      renewalPrice: '',
      domainApprovedBy: '',
      status: 'Live',
      auto_renewal: 'On',
      listing_status: 'Listed',
      notes: ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Domain Form For Websites</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <Controller
                name='domainName'
                control={control}
                rules={{ required: 'Hosting Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Domain Name'
                    error={Boolean(errors.domainName)}
                    helperText={errors.domainName ? errors.domainName.message : ''}
                  />
                )}
              ></Controller>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <Controller
                name='creationDate'
                control={control}
                rules={{ required: 'Creation Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='date'
                    label='Creation Date'
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={Boolean(errors.creationDate ? errors.creationDate.message : '')}
                    helperText={errors.creationDate ? errors.creationDate.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <Controller
                name='expirationDate'
                control={control}
                rules={{ required: 'Expiration Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Expiration Date'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.expirationDate)}
                    helperText={errors.expirationDate ? errors.expirationDate.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <Controller
                name='renewalPrice'
                control={control}
                rules={{ required: 'Renewal Price is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Renewal Price'
                    type='number'
                    error={Boolean(errors.renewalPrice)}
                    helperText={errors.renewalPrice ? errors.renewalPrice.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <Controller
                name='domainApprovedBy'
                control={control}
                rules={{ required: 'Domain Approved By is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Domain Approved By'
                    error={Boolean(errors.domainApprovedBy)}
                    helperText={errors.domainApprovedBy ? errors.domainApprovedBy.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <Select {...field} label='Status' defaultValue='Live'>
                    <MenuItem value='Live'>Live</MenuItem>
                    <MenuItem value='Not Live'>Not Live</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name='auto_renewal'
                control={control}
                render={({ field }) => (
                  <Select {...field} label='Auto Renewal' defaultValue='On'>
                    <MenuItem value='On'>On</MenuItem>
                    <MenuItem value='Off'>Off</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name='listing_status'
                control={control}
                render={({ field }) => (
                  <Select {...field} label='Listing Status' defaultValue='Listed'>
                    <MenuItem value='Listed'>Listed</MenuItem>
                    <MenuItem value='Not_Listed'>Not Listed</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              {/* <InputLabel>Notes</InputLabel> */}
              <Controller
                name='notes'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    maxRows={100}
                    label='Notes'
                    error={Boolean(errors.notes)}
                    helperText={errors.notes ? errors.notes.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default DomainForm
