import React from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { TextField, Grid, MenuItem, FormControl, FormHelperText, Select, InputLabel, Button } from '@mui/material'
import dayjs from 'dayjs'

const HostingForm = () => {
  const methods = useForm({
    defaultValues: {
      hostingName: '',
      creationDate: dayjs().format('YYYY-MM-DD'),
      expirationDate: dayjs().format('YYYY-MM-DD'),
      renewalPrice: '',
      hostingApprovedBy: '',
      status: 'Live',
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
        <h1>Hosting Form For Websites</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='hostingName'
                control={control}
                rules={{ required: 'Domain Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Hosting Name'
                    error={Boolean(errors.hostingName)}
                    helperText={errors.hostingName ? errors.hostingName.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='creationDate'
                control={control}
                rules={{ required: 'Creation Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Creation Date'
                    type='date'
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={Boolean(errors.creationDate)}
                    helperText={errors.creationDate ? errors.creationDate.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={Boolean(errors.expirationDate)}
                    helperText={errors.expirationDate ? errors.expirationDate.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='hostingApprovedBy'
                control={control}
                rules={{ required: 'Domain Approved By is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Domain Approved By'
                    error={Boolean(errors.hostingApprovedBy)}
                    helperText={errors.hostingApprovedBy ? errors.hostingApprovedBy.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default HostingForm
