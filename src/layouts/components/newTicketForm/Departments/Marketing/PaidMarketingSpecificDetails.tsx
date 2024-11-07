import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { PaidMarketingFormType } from 'src/interfaces/forms.interface'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { PaidMarketingWorkStatus, PaidMarketingWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const PaidMarketingSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control,
    watch
  } = useFormContext<PaidMarketingFormType>()

  const workStatus = watch('paidMarketingDetails.work_status')

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.work_status}>
            <InputLabel htmlFor='work_status'>Work Status</InputLabel>
            <Controller
              name='paidMarketingDetails.work_status'
              control={control}
              defaultValue=''
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth >
                    {' '}
                    {PaidMarketingWorkStatusValues.map(v => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.paidMarketingDetails?.work_status && (
                    <FormHelperText>{errors.paidMarketingDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.service_name}>
            <Controller
              name='paidMarketingDetails.service_name'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    error={Boolean(errors?.paidMarketingDetails?.service_name)}
                    fullWidth
                  />
                  {errors.paidMarketingDetails?.service_name && (
                    <FormHelperText>{errors.paidMarketingDetails.service_name.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.location}>
            <Controller
              name='paidMarketingDetails.location'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Location'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.paidMarketingDetails?.location)}
                  />
                  {errors.paidMarketingDetails?.location && (
                    <FormHelperText>{errors.paidMarketingDetails.location.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.ad_account_access}>
            <Controller
              name='paidMarketingDetails.ad_account_access'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Add Account Access'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.paidMarketingDetails?.ad_account_access)}
                  />
                  {errors.paidMarketingDetails?.ad_account_access && (
                    <FormHelperText>{errors.paidMarketingDetails.ad_account_access.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.budget}>
            <InputLabel htmlFor='budget'>Budget</InputLabel>
            <Controller
              name='paidMarketingDetails.budget'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <Select label='Budget' {...field} fullWidth>
                    <MenuItem value='Daily'>Daily</MenuItem>
                    <MenuItem value='Weekly'>Weekly</MenuItem>
                    <MenuItem value='Monthly'>Monthly</MenuItem>
                  </Select>
                  {errors.paidMarketingDetails?.budget && (
                    <FormHelperText>{errors.paidMarketingDetails.budget.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.budget_price}>
            <Controller
              name='paidMarketingDetails.budget_price'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    {...field}
                    label='Budget Price'
                    error={Boolean(errors?.paidMarketingDetails?.budget_price)}
                    fullWidth
                  />
                  {errors.paidMarketingDetails?.budget_price && (
                    <FormHelperText>{errors?.paidMarketingDetails?.budget_price?.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.clients_objectives}>
            <Controller
              name='paidMarketingDetails.clients_objectives'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Client Objective'
                    {...field}
                    error={Boolean(errors?.paidMarketingDetails?.clients_objectives)}
                    fullWidth
                  />
                  {errors.paidMarketingDetails?.clients_objectives && (
                    <FormHelperText>{errors.paidMarketingDetails.clients_objectives.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paidMarketingDetails?.notes}>
            <Controller
              name='paidMarketingDetails.notes'
              control={control}
              rules={{ required: 'Website URL is required' }}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.paidMarketingDetails?.notes)} fullWidth />
                  {errors.paidMarketingDetails?.notes && (
                    <FormHelperText>{errors.paidMarketingDetails.notes.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        {workStatus === PaidMarketingWorkStatus.OTHERS && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.paidMarketingDetails?.platform_name}>
              <Controller
                name='paidMarketingDetails.platform_name'
                control={control}
                rules={{ required: 'Website URL is required' }}
                disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
                render={({ field }) => (
                  <>
                    <TextField
                      label='Platform Name'
                      {...field}
                      error={Boolean(errors?.paidMarketingDetails?.platform_name)}
                      fullWidth
                    />
                    {errors.paidMarketingDetails?.platform_name && (
                      <FormHelperText>{errors.paidMarketingDetails.platform_name.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default PaidMarketingSpecificDetails
