import { Grid, FormControl, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React from 'react'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { wordPressDefaultValues } from 'src/interfaces/forms.interface'
import MuiTable from 'src/layouts/components/tables/MuiTable'

type DomainFormType = {
  creationDate: string
  domainName: string
  expirationDate: string
  price: string
  status: string
  list_status: string
  notes: string
}
const DomainForm = () => {
  const columns = [
    {
      header: 'Creation Date',
      accessorKey: 'business_id.business_name'
    },

    {
      header: 'Domain Name',
      accessorKey: 'domain_name'
    },

    {
      header: 'Expiration Date',
      accessorKey: 'expiration_date'
    },

    {
      header: 'Price',
      accessorKey: 'price'
    },

    {
      header: 'Status',
      accessorKey: 'status'
    },
    {
      header: 'List Status',
      accessorKey: 'list_status'
    },
    {
      header: 'Actions',
      accessorKey: 'actions'
    }
  ]

  const methods = useForm({
    defaultValues: {
      creationDate: dayjs().format('YYYY-MM-DD'),
      domainName: '',
      expirationDate: dayjs().format('YYYY-MM-DD'),
      price: '',

      status: 'Live',
      list_status: 'Listed',
      notes: ''
    }
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  const onSubmit = async (data: {
    creationDate: string
    domainName: string
    expirationDate: string
    price: string
    status: string
    list_status: string
    notes: string
  }) => {
    const apiUrl = '/api/domain-forms/create'

    const requestData = {
      creation_date: data.creationDate,
      domain_name: data.domainName,
      expiry_date: data.expirationDate,
      price: data.price,
      status: data.status,
      list_status: data.list_status
    }
    await axios
      .post(apiUrl, requestData, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        toast.success('Ticket created successfully')
        methods.reset()
      })
      .catch(error => {
        console.error('Error:', error)
        // toast.error(error?.response?.data || 'Something went wrong')
      })
  
  }

  return (
    <>
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
                  name='price'
                  control={control}
                  rules={{ required: 'Renewal Price is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label=' Price'
                      type='number'
                      error={Boolean(errors.price)}
                      helperText={errors.price ? errors.price.message : ''}
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
                <InputLabel>List Status</InputLabel>
                <Controller
                  name='list_status'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label='Status' defaultValue='Live'>
                      <MenuItem value='listed'>listed</MenuItem>
                      <MenuItem value='not listed'>Not Live</MenuItem>
                    </Select>
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
      <MuiTable columns={columns} data={[]} />
    </>
  )
}

export default DomainForm
