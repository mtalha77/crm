import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { WebSeoFormType } from 'src/interfaces/forms.interface'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { WebSeoWorkStatus, WebSeoWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'

const WebSeoSpecificDetails = () => {
  const {
    formState: { errors },
    control,
    watch
  } = useFormContext<WebSeoFormType>()

  const workStatus = watch('webSeoDetails.work_status')

  const { user } = useAuth()

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
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
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
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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

        {((user?.role === UserRole.TEAM_LEAD && user?.department_name === Department.WebSeo) ||
          user?.role === UserRole.ADMIN ||
          user?.role === UserRole.SALE_MANAGER) && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.webSeoDetails?.login_credentials}>
              <Controller
                name='webSeoDetails.login_credentials'
                disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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
        )}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.webSeoDetails?.console_access}>
            <Controller
              name='webSeoDetails.console_access'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
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

        {workStatus === WebSeoWorkStatus.BACK_LINKS || workStatus === WebSeoWorkStatus.EXTRA_LINKS ? (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.webSeoDetails?.no_of_backlinks}>
              <Controller
                name='webSeoDetails.no_of_backlinks'
                control={control}
                disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
                render={({ field }) => (
                  <>
                    <TextField
                      label='No of backlinks'
                      {...field}
                      error={Boolean(errors?.webSeoDetails?.no_of_backlinks)}
                      fullWidth
                    />
                    {errors.webSeoDetails?.no_of_backlinks && (
                      <FormHelperText>{errors.webSeoDetails.no_of_backlinks.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>
        ) : workStatus === WebSeoWorkStatus.PAID_GUEST_POSTING ? (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.webSeoDetails?.no_of_posts}>
              <Controller
                name='webSeoDetails.no_of_posts'
                disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      label='No of posts'
                      {...field}
                      error={Boolean(errors?.webSeoDetails?.no_of_posts)}
                      fullWidth
                    />
                    {errors.webSeoDetails?.no_of_posts && (
                      <FormHelperText>{errors.webSeoDetails.no_of_posts.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>
        ) : workStatus === WebSeoWorkStatus.MONTHLY_SEO ? (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.webSeoDetails?.no_of_blogs}>
              <Controller
                name='webSeoDetails.no_of_blogs'
                disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      label='No of blogs'
                      {...field}
                      error={Boolean(errors?.webSeoDetails?.no_of_blogs)}
                      fullWidth
                    />
                    {errors.webSeoDetails?.no_of_blogs && (
                      <FormHelperText>{errors.webSeoDetails.no_of_blogs.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}

export default WebSeoSpecificDetails
