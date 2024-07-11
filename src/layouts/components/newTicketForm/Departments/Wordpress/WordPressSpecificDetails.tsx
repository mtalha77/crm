import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { WordPressFormType } from 'src/interfaces/forms.interface'
import { WordPressWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const WordPressSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<WordPressFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.wordPressDetails?.work_status}>
            <InputLabel htmlFor='workStatus'>SubCategories</InputLabel>
            <Controller
              name='wordPressDetails.work_status'
              control={control}
              defaultValue=''
              rules={{ required: user?.role !== UserRole.TEAM_LEAD }} // Conditional validation
              render={({ field }) => (
                <>
                  <Select label='SubCategories' {...field} fullWidth disabled={user?.role === UserRole.TEAM_LEAD}>
                    {' '}
                    {WordPressWorkStatusValues.map(v => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {errors.wordPressDetails?.work_status && (
                    <FormHelperText>{errors.wordPressDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.wordPressDetails?.service_name}>
            <Controller
              name='wordPressDetails.service_name'
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors.wordPressDetails?.service_name)}
                  />
                  <FormHelperText>{errors.wordPressDetails?.service_name?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.wordPressDetails?.service_area}>
            <Controller
              name='wordPressDetails.service_area'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Area'
                    {...field}
                    fullWidth
                    error={!!errors.wordPressDetails?.service_area}
                  />
                  <FormHelperText>{errors.wordPressDetails?.service_area?.message || ''}</FormHelperText>
                </>
              )}
              rules={{ required: true }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.wordPressDetails?.referral_website}>
            <Controller
              name='wordPressDetails.referral_website'
              control={control}
              rules={{ required: true }}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Referral Website'
                    {...field}
                    fullWidth
                    error={Boolean(errors.wordPressDetails?.referral_website)}
                  />
                  <FormHelperText>{errors.wordPressDetails?.referral_website?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.wordPressDetails?.notes}>
            <Controller
              name='wordPressDetails.notes'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.wordPressDetails?.notes)} fullWidth />
                  {errors.wordPressDetails?.notes && (
                    <FormHelperText>{errors.wordPressDetails.notes.message}</FormHelperText>
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

export default WordPressSpecificDetails
