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
import React, { useState, useEffect } from 'react'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type DomainFormType = {
  _id?: string
  creationDate: string
  domainHolder: string
  domainPlatform: string
  domainName: string
  expirationDate: string
  price: string
  live_status: string
  list_status: string
  notes: string
  domainApprovedBy: string
  business: string
}

const UpdateDomainForm = (props: any) => {
  const {
    handleUpdateDomainForm = () => {
      /* Default function, does nothing */
    },
    updatedDomain,
    setShow
  } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [businesses, setBusinesses] = useState<{ _id: string; business_name: string }[]>([])

  const defaultValues = {
    creationDate: updatedDomain.creation_date
      ? dayjs(updatedDomain.creation_date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    domainName: updatedDomain.domain_name || '',
    expirationDate: updatedDomain.expiration_date
      ? dayjs(updatedDomain.expiration_date).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    price: updatedDomain.price || '',
    live_status: updatedDomain.live_status || 'Live',
    list_status: updatedDomain.list_status || 'Listed',
    notes: updatedDomain.notes || '',
    domainHolder: updatedDomain.domain_holder || '',
    domainPlatform: updatedDomain.domain_platform || '',
    domainApprovedBy: updatedDomain.domainApprovedBy || '',
    business: updatedDomain.business || ''
  }

  const methods = useForm({
    defaultValues
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods

  const onSubmit = async (data: DomainFormType) => {
    if (loading) return

    const apiUrl = `/api/domain-forms/update/`
    const requestData = {
      creation_date: data.creationDate,
      domain_name: data.domainName,
      business: data.business,
      domain_holder: data.domainHolder,
      domain_platform: data.domainPlatform,
      expiration_date: data.expirationDate,
      price: data.price,
      live_status: data.live_status,
      list_status: data.list_status,
      domainApprovedBy: data.domainApprovedBy,
      notes: data.notes,
      domain_id: updatedDomain._id
    }

    try {
      setLoading(true)
      const response = await axios.post(apiUrl, requestData, {
        headers: { authorization: localStorage.getItem('token') }
      })
      if (response.status === 200) {
        handleUpdateDomainForm({ ...requestData, _id: updatedDomain._id })
        setShow(false)
        toast.success('Domain Form Updated Successfully')
      } else {
        toast.error('Failed to update domain')
      }
    } catch (error) {
      console.error('Error response:', error)
      toast.error('Failed to update domain')
    } finally {
      setLoading(false)
    }
  }

  // Fetch businesses for the select dropdown
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('/api/business/get-all-names', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setBusinesses(response.data.payload.businesses)
    } catch (error) {
      console.error('Error fetching businesses:', error)
    }
  }

  useEffect(() => {
    fetchBusinesses()
  }, [])

  return (
    <Card>
      <CardHeader title='Update Domain' />
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Business Name</InputLabel>
                  <Controller
                    name='business'
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label='Business Name' value={field.value} onChange={field.onChange}>
                        {businesses.map(business => (
                          <MenuItem key={business._id} value={business._id}>
                            {business.business_name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='domainName'
                    control={control}
                    rules={{ required: 'Domain Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Domain Name'
                        error={Boolean(errors.domainName)}
                        helperText={errors.domainName ? (errors.domainName.message as React.ReactNode) : ''}
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
                        error={Boolean(errors.creationDate)}
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
                    name='domainApprovedBy'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Domain Approved By'
                        error={Boolean(errors.domainApprovedBy)}
                        helperText={errors.domainApprovedBy ? (errors.domainApprovedBy.message as React.ReactNode) : ''}
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
                    name='domainHolder'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Domain Holder'
                        error={Boolean(errors.domainHolder)}
                        helperText={errors.domainHolder ? (errors.domainHolder.message as React.ReactNode) : ''}
                      />
                    )}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '20px' }}>
                <FormControl fullWidth>
                  <Controller
                    name='domainPlatform'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Domain Platform'
                        error={Boolean(errors.domainPlatform)}
                        helperText={errors.domainPlatform ? (errors.domainPlatform.message as React.ReactNode) : ''}
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
                  Update Domain
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default UpdateDomainForm
