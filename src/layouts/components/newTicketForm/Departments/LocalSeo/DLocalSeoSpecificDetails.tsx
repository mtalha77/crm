import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { LocalSeoFormType } from 'src/interfaces/forms.interface'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { LocalSeoWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'
import { useAuth } from 'src/hooks/useAuth'

const DLocalSeoSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<LocalSeoFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.localSeoDetails?.work_status}>
            <InputLabel htmlFor='workStatus'>Work Status</InputLabel>
            <Controller
              name='localSeoDetails.work_status'
              control={control}
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              defaultValue=''
              render={({ field }) => (
                <>
                  <Select
                    label='Work Status'
                    {...field}
                    fullWidth
                    disabled={!(user?.role === UserRole.TEAM_LEAD || user?.role === UserRole.ADMIN)}
                  >
                    {LocalSeoWorkStatusValues.map(v => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.localSeoDetails?.work_status && (
                    <FormHelperText>{errors.localSeoDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.localSeoDetails?.service_name}>
            <Controller
              name='localSeoDetails.service_name'
              control={control}
              rules={{ required: true && user?.role !== UserRole.TEAM_LEAD }}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors.localSeoDetails?.service_name)}
                  />
                  <FormHelperText>{errors.localSeoDetails?.service_name?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.localSeoDetails?.service_area}>
            <Controller
              name='localSeoDetails.service_area'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField label='Service Area' {...field} fullWidth error={!!errors.localSeoDetails?.service_area} />
                  <FormHelperText>{errors.localSeoDetails?.service_area?.message || ''}</FormHelperText>
                </>
              )}
              rules={{ required: true && user?.role !== UserRole.TEAM_LEAD }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.localSeoDetails?.gmb_access_email}>
            <Controller
              name='localSeoDetails.gmb_access_email'
              control={control}
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Gmb Access Email'
                    {...field}
                    error={Boolean(errors?.localSeoDetails?.gmb_access_email)}
                    fullWidth
                  />
                  {errors.localSeoDetails?.gmb_access_email && (
                    <FormHelperText>{errors.localSeoDetails.gmb_access_email.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.localSeoDetails?.notes}>
            <Controller
              name='localSeoDetails.notes'
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.localSeoDetails?.notes)} fullWidth />
                  {errors.localSeoDetails?.notes && (
                    <FormHelperText>{errors.localSeoDetails.notes.message}</FormHelperText>
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

export default DLocalSeoSpecificDetails
