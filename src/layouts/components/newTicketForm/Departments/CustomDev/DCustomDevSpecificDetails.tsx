import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomDevFormType } from 'src/interfaces/forms.interface'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { CustomDevWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'
import { useAuth } from 'src/hooks/useAuth'

const DCustomDevSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<CustomDevFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.customDevDetails?.work_status}>
            <InputLabel htmlFor='workStatus'>Work Status</InputLabel>
            <Controller
              name='customDevDetails.work_status'
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
                    {CustomDevWorkStatusValues.map(v => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.customDevDetails?.work_status && (
                    <FormHelperText>{errors.customDevDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.customDevDetails?.service_name}>
            <Controller
              name='customDevDetails.service_name'
              control={control}
              rules={{ required: true && user?.role !== UserRole.TEAM_LEAD }}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors.customDevDetails?.service_name)}
                  />
                  <FormHelperText>{errors.customDevDetails?.service_name?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.customDevDetails?.service_area}>
            <Controller
              name='customDevDetails.service_area'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Area'
                    {...field}
                    fullWidth
                    error={!!errors.customDevDetails?.service_area}
                  />
                  <FormHelperText>{errors.customDevDetails?.service_area?.message || ''}</FormHelperText>
                </>
              )}
              rules={{ required: true && user?.role !== UserRole.TEAM_LEAD }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.customDevDetails?.notes}>
            <Controller
              name='customDevDetails.notes'
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.customDevDetails?.notes)} fullWidth />
                  {errors.customDevDetails?.notes && (
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

export default DCustomDevSpecificDetails
