import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { BusinessDetails } from 'src/interfaces/forms.interface'

const BusinessDetailsUpdate = (props: any) => {
  const { update } = props
  const {
    formState: { errors },
    control
  } = useFormContext<BusinessDetails>()

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Name'
                  onChange={onChange}
                  error={Boolean(errors?.business_name)}
                  aria-describedby='validation-basic-business_name'
                />
              )}
            />
            {errors?.business_name && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-business_name'>
                {errors?.business_name.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business_email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Email'
                  onChange={onChange}
                  error={Boolean(errors?.business_email)}
                  aria-describedby='validation-basic-last-name'
                />
              )}
            />
            {errors?.business_email && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                {errors?.business_email.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business_number'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Number'
                  onChange={onChange}
                  error={Boolean(errors?.business_number)}
                  aria-describedby='validation-basic-last-nam'
                />
              )}
            />
            {errors?.business_number && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-nam'>
                {errors?.business_number.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business_hours'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={update}
                  value={value}
                  label='Business Hours'
                  onChange={onChange}
                  error={Boolean(errors?.business_hours)}
                  aria-describedby='validation-basic-last-na'
                />
              )}
            />
            {errors?.business_hours && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-na'>
                {errors?.business_hours.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.country}>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <>
                  <TextField disabled={update} label='Country' {...field} fullWidth error={Boolean(errors?.country)} />
                  {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.state}>
            <Controller
              name='state'
              control={control}
              render={({ field }) => (
                <>
                  <TextField disabled={update} label='State' {...field} error={Boolean(errors?.state)} fullWidth />
                  {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='street'
              control={control}
              render={({ field }) => (
                <>
                  <TextField disabled={update} label='Street' {...field} error={Boolean(errors?.street)} fullWidth />
                  {errors.street && <FormHelperText>{errors.street.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.zip_code}>
            <Controller
              name='zip_code'
              control={control}
              render={({ field }) => (
                <>
                  <TextField disabled={update} label='ZipCode' {...field} error={Boolean(errors?.zip_code)} fullWidth />
                  {errors?.zip_code && <FormHelperText>{errors.zip_code.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.website_url}>
            <Controller
              name='website_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Website URL'
                    {...field}
                    error={Boolean(errors?.website_url)}
                    fullWidth
                  />
                  {errors.website_url && <FormHelperText>{errors.website_url.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.social_profile}>
            <Controller
              name='social_profile'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={update}
                    label='Social Profile'
                    {...field}
                    error={Boolean(errors?.social_profile)}
                    fullWidth
                  />
                  {errors.social_profile && <FormHelperText>{errors.social_profile.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.gmb_url}>
            <Controller
              name='gmb_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField disabled={update} label='Gmb Url' {...field} error={Boolean(errors?.gmb_url)} fullWidth />
                  {errors.gmb_url && <FormHelperText>{errors.gmb_url.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default BusinessDetailsUpdate
