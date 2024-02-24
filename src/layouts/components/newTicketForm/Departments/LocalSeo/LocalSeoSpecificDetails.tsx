import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { LocalSeoFormType } from 'src/interfaces/forms.interface'
import { LocalSeoWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const LocalSeoSpecificDetails = () => {
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
              defaultValue=''
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth>
                    {LocalSeoWorkStatusValues.map(v => {
                      return (
                        <MenuItem key={v} value={v}>
                          {v}
                        </MenuItem>
                      )
                    })}
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
          <FormControl fullWidth error={!!errors.localSeoDetails?.notes}>
            <Controller
              name='localSeoDetails.notes'
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

export default LocalSeoSpecificDetails
