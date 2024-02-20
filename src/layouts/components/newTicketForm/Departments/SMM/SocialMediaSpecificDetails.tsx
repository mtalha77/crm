import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { LocalSeoFormType, SocialMediaFormType } from 'src/interfaces/forms.interface'
import { LocalSeoWorkStatusValues, SocialMediaWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const SocialMediaSpecificDetails = () => {
  const {
    formState: { errors },
    control
  } = useFormContext<SocialMediaFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.work_status}>
            <InputLabel htmlFor='workStatus'>Work Status</InputLabel>
            <Controller
              name='socialMediaFormTypeDetails.work_status'
              control={control}
              defaultValue=''
              rules={{ required: 'Work Status is required' }}
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth>
                    {SocialMediaWorkStatusValues.map(v => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.socialMediaFormTypeDetails?.work_status && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.service_name}>
            <Controller
              name='socialMediaFormTypeDetails.service_name'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    error={Boolean(errors?.socialMediaFormTypeDetails?.service_name)}
                    fullWidth
                  />
                  {errors.socialMediaFormTypeDetails?.service_name && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.service_name.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.gmb_url}>
            <Controller
              name='socialMediaFormTypeDetails.gmb_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='GMB URL'
                    {...field}
                    error={Boolean(errors?.socialMediaFormTypeDetails?.gmb_url)}
                    fullWidth
                  />
                  {errors.socialMediaFormTypeDetails?.gmb_url && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.gmb_url.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.facebook_url}>
            <Controller
              name='socialMediaFormTypeDetails.facebook_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Facebook Url'
                    {...field}
                    error={Boolean(errors?.socialMediaFormTypeDetails?.facebook_url)}
                    fullWidth
                  />
                  {errors.socialMediaFormTypeDetails?.facebook_url && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.facebook_url.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.login_credentials}>
            <Controller
              name='socialMediaFormTypeDetails.login_credentials'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Login Credentials'
                    {...field}
                    error={Boolean(errors?.socialMediaFormTypeDetails?.login_credentials)}
                    fullWidth
                  />
                  {errors.socialMediaFormTypeDetails?.login_credentials && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.login_credentials.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.socialMediaFormTypeDetails?.notes}>
            <Controller
              name='socialMediaFormTypeDetails.notes'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Notes'
                    {...field}
                    error={Boolean(errors?.socialMediaFormTypeDetails?.notes)}
                    fullWidth
                  />
                  {errors.socialMediaFormTypeDetails?.notes && (
                    <FormHelperText>{errors.socialMediaFormTypeDetails.notes.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default SocialMediaSpecificDetails
