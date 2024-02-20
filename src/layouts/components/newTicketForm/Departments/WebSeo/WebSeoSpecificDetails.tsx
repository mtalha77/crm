import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { WebSeoFormType } from 'src/interfaces/forms.interface'
import { WebSeoWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const WebSeoSpecificDetails = () => {
  const {
    formState: { errors },
    control
  } = useFormContext<WebSeoFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.work_status}>
            <InputLabel htmlFor='workStatus'>Work Status</InputLabel>
            <Controller
              name='webSeoDetails.work_status'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth>
                    {WebSeoWorkStatusValues.map(v => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.webSeoDetails?.work_status && (
                    <FormHelperText>{errors.webSeoDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.service_name}>
            <Controller
              name='webSeoDetails.service_name'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors.webSeoDetails?.service_name)}
                  />
                  <FormHelperText>{errors.webSeoDetails?.service_name?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.service_location}>
            <Controller
              name='webSeoDetails.service_location'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Location'
                    {...field}
                    fullWidth
                    error={Boolean(errors.webSeoDetails?.service_location)}
                  />
                  <FormHelperText>{errors.webSeoDetails?.service_location?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.key_words}>
            <Controller
              name='webSeoDetails.key_words'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Keywords' {...field} fullWidth error={Boolean(errors.webSeoDetails?.key_words)} />
                  <FormHelperText>{errors.webSeoDetails?.key_words?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.login_credentials}>
            <Controller
              name='webSeoDetails.login_credentials'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Login Credentials'
                    {...field}
                    fullWidth
                    error={Boolean(errors.webSeoDetails?.login_credentials)}
                  />
                  <FormHelperText>{errors.webSeoDetails?.login_credentials?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.console_access}>
            <Controller
              name='webSeoDetails.console_access'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Console Access'
                    {...field}
                    fullWidth
                    error={Boolean(errors.webSeoDetails?.console_access)}
                  />
                  <FormHelperText>{errors.webSeoDetails?.console_access?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.analytics_access}>
            <Controller
              name='webSeoDetails.analytics_access'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Analytics Access'
                    {...field}
                    fullWidth
                    error={Boolean(errors.webSeoDetails?.analytics_access)}
                  />
                  <FormHelperText>{errors.webSeoDetails?.analytics_access?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.gmb_url}>
            <Controller
              name='webSeoDetails.gmb_url'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='GMB URL' {...field} error={Boolean(errors?.webSeoDetails?.gmb_url)} fullWidth />
                  {errors.webSeoDetails?.gmb_url && (
                    <FormHelperText>{errors.webSeoDetails.gmb_url.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.notes}>
            <Controller
              name='webSeoDetails.notes'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.webSeoDetails?.notes)} fullWidth />
                  {errors.webSeoDetails?.notes && <FormHelperText>{errors.webSeoDetails.notes.message}</FormHelperText>}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default WebSeoSpecificDetails
