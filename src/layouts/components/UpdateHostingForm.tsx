import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type HostingFormType = {
  _id?: string
  creationDate: string
  hostingHolder: string
  hostingPlatform: string
  hostingName: string
  businessName: string
  expirationDate: string
  price: string
  live_status: string
  list_status: string
  notes: string
  hostingApprovedBy: string
}

const UpdateHostingForm = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const updatedHosting = props.updatedHosting

  const defaultValues = {
    creationDate: updatedHosting.creation_date
      ? dayjs(updatedHosting.creation_date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    hostingName: updatedHosting.hosting_name || '',
    businessName: updatedHosting.business_name || '',
    expirationDate: updatedHosting.expiration_date
      ? dayjs(updatedHosting.expiration_date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    price: updatedHosting.price || '',
    live_status: updatedHosting.live_status || 'Live',
    list_status: updatedHosting.list_status || 'Listed',
    notes: updatedHosting.notes || '',
    hostingHolder: updatedHosting.hosting_holder || '',
    hostingPlatform: updatedHosting.hosting_platform || '',
    hostingApprovedBy: updatedHosting.hostingApprovedBy || ''
  }

  const methods = useForm({
    defaultValues
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  const onSubmit = async (data: HostingFormType) => {
    if (loading) return

    const apiUrl = `/api/hosting-forms/update/`
    const requestData = {
      creation_date: data.creationDate,
      hosting_name: data.hostingName,
      business_name: data.businessName,
      hosting_holder: data.hostingHolder,
      hosting_platform: data.hostingPlatform,
      expiration_date: data.expirationDate,
      price: data.price,
      live_status: data.live_status,
      list_status: data.list_status,
      hostingApprovedBy: data.hostingApprovedBy,
      notes: data.notes,
      hosting_id: updatedHosting._id
    }

    try {
      setLoading(true)
      const response = await axios.post(apiUrl, requestData, {
        headers: { authorization: localStorage.getItem('token') }
      })
      if (response.status === 200) {
        props.handleUpdateHostingForm({ ...requestData, _id: updatedHosting._id })
        props.setShow(false)
      } else {
        toast.error('Failed to update hosting')
      }
    } catch (error) {
      console.error('Error response:', error)
      toast.error('Failed to update hosting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Update Hosting' />
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='hostingName'
                    control={control}
                    rules={{ required: 'Hosting Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Hosting Name'
                        error={Boolean(errors.hostingName)}
                        helperText={errors.hostingName ? (errors.hostingName.message as React.ReactNode) : ''}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='businessName'
                    control={control}
                    rules={{ required: 'Business Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Business Name'
                        error={Boolean(errors.businessName)}
                        helperText={errors.businessName ? (errors.businessName.message as React.ReactNode) : ''}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
                        value={field.value}
                        onChange={field.onChange}
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
                        value={field.value}
                        onChange={field.onChange}
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
                    rules={{ required: 'Price is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Price'
                        type='number'
                        error={Boolean(errors.price)}
                        helperText={errors.price ? (errors.price.message as React.ReactNode) : ''}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Controller
                    name='live_status'
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label='Status' value={field.value} onChange={field.onChange}>
                        <MenuItem value='Live'>Live</MenuItem>
                        <MenuItem value='NotLive'>Not Live</MenuItem>
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
                      <Select {...field} label='List Status' value={field.value} onChange={field.onChange}>
                        <MenuItem value='Listed'>Listed</MenuItem>
                        <MenuItem value='NotListed'>Not Listed</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='hostingApprovedBy'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Hosting Approved By'
                        error={Boolean(errors.hostingApprovedBy)}
                        helperText={
                          errors.hostingApprovedBy ? (errors.hostingApprovedBy.message as React.ReactNode) : ''
                        }
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='hostingHolder'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Hosting Holder'
                        error={Boolean(errors.hostingHolder)}
                        helperText={errors.hostingHolder ? (errors.hostingHolder.message as React.ReactNode) : ''}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>{' '}
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='hostingPlatform'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Hosting Holder'
                        error={Boolean(errors.hostingPlatform)}
                        helperText={errors.hostingPlatform ? (errors.hostingPlatform.message as React.ReactNode) : ''}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='notes'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Notes'
                        error={Boolean(errors.notes)}
                        helperText={errors.notes ? (errors.notes.message as React.ReactNode) : ''}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button type='submit' variant='contained' color='primary' fullWidth disabled={loading}>
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: 'common.white',
                        width: '20px !important',
                        height: '20px !important',
                        mr: theme => theme.spacing(2)
                      }}
                    />
                  ) : null}
                  Update Hosting
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default UpdateHostingForm
