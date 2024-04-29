import { Autocomplete, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CommonFormType } from 'src/interfaces/forms.interface'

const DBusinessDetails = (props: any) => {
  const { update, setBusiness_id } = props
  const {
    formState: { errors },
    control,
    setValue
  } = useFormContext<CommonFormType>()

  const [data, setData] = useState([])

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await axios.get('/api/business/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })
        setData(res.data.payload.businesses)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  const setBusinessValues = (value: any) => {
    if (!value) return

    const business: any = data.find((d: any) => d.business_name === value)
    if (!business) return
    setBusiness_id(business._id)
    setValue('business.business_email', business.business_email, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
    setValue('business.business_number', business.business_number)
    setValue('business.business_hours', business.business_hours)
    setValue('business.street', business.street)
    setValue('business.country', business.country)
    setValue('business.state', business.state)
    setValue('business.street', business.street)
    setValue('business.zip_code', business.zip_code)
    setValue('business.website_url', business.website_url)
    setValue('business.social_profile', business.social_profile)
    setValue('business.gmb_url', business.gmb_url)
  }

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name='business.business_name'
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(e: any, newValue) => {
                    setBusinessValues(newValue)
                    field.onChange(newValue ? newValue : '')
                  }}
                  id='autocomplete-free-solo'
                  options={data.map((option: any) => option.business_name)}
                  getOptionLabel={option => {
                    if (typeof option === 'object') return option.business_name

                    return option
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      error={Boolean(errors?.business?.business_name)}
                      inputRef={field.ref}
                      label='Business Name'
                    />
                  )}
                />
              )}
            />
            {errors?.business?.business_name && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-business-name'>
                {errors?.business?.business_name?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.business_email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Email'
                  onChange={onChange}
                  error={Boolean(errors?.business?.business_email)}
                  aria-describedby='validation-basic-last-name'
                />
              )}
            />
            {errors?.business?.business_email && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                {errors?.business?.business_email.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.business_number'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Number'
                  onChange={onChange}
                  error={Boolean(errors?.business?.business_number)}
                  aria-describedby='validation-basic-last-nam'
                />
              )}
            />
            {errors?.business?.business_number && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-nam'>
                {errors?.business?.business_number.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.business_hours'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Hours'
                  onChange={onChange}
                  error={Boolean(errors?.business?.business_hours)}
                  aria-describedby='validation-basic-last-na'
                />
              )}
            />
            {errors?.business?.business_hours && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-na'>
                {errors?.business?.business_hours.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.client_name}>
            <Controller
              name='business.client_name'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Client Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.business?.client_name)}
                  />
                  {errors.business?.client_name && (
                    <FormHelperText>{errors.business.client_name.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.country}>
            <Controller
              name='business.country'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Country'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.business?.country)}
                  />
                  {errors.business?.country && <FormHelperText>{errors.business.country.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.state}>
            <Controller
              name='business.state'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='State'
                    {...field}
                    error={Boolean(errors?.business?.state)}
                    fullWidth
                  />
                  {errors.business?.state && <FormHelperText>{errors.business.state.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.street'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Street'
                    {...field}
                    error={Boolean(errors?.business?.street)}
                    fullWidth
                  />
                  {errors.business?.street && <FormHelperText>{errors.business.street.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.zip_code}>
            <Controller
              name='business.zip_code'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='ZipCode'
                    {...field}
                    error={Boolean(errors?.business?.zip_code)}
                    fullWidth
                  />
                  {errors.business?.zip_code && <FormHelperText>{errors.business.zip_code.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.website_url}>
            <Controller
              name='business.website_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Website URL'
                    {...field}
                    error={Boolean(errors?.business?.website_url)}
                    fullWidth
                  />
                  {errors.business?.website_url && (
                    <FormHelperText>{errors.business.website_url.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.social_profile}>
            <Controller
              name='business.social_profile'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Social Profile'
                    {...field}
                    error={Boolean(errors?.business?.social_profile)}
                    fullWidth
                  />
                  {errors.business?.social_profile && (
                    <FormHelperText>{errors.business.social_profile.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.business?.gmb_url}>
            <Controller
              name='business.gmb_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Gmb Url'
                    {...field}
                    error={Boolean(errors?.business?.gmb_url)}
                    fullWidth
                  />
                  {errors.business?.gmb_url && <FormHelperText>{errors.business.gmb_url.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default DBusinessDetails
