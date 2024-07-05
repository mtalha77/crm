import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DWriterFormType } from 'src/interfaces/departmentalForms.interface'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const WriterSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<DWriterFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.notes}>
            <Controller
              name='writerFormTypeDetails.notes'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.writerFormTypeDetails?.notes)} fullWidth />
                  {errors.writerFormTypeDetails?.notes && (
                    <FormHelperText>{errors.writerFormTypeDetails.notes.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.task_details}>
            <Controller
              name='writerFormTypeDetails.task_details'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD} // Disable for Team Lead
              render={({ field }) => (
                <>
                  <TextField
                    label='Task Details'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.task_details)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.task_details && (
                    <FormHelperText>{errors.writerFormTypeDetails.task_details.message}</FormHelperText>
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

export default WriterSpecificDetails
