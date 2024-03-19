import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DDesignerFormType } from 'src/interfaces/departmentalForms.interface'

const DesignerSpecificDetails = () => {
  const {
    formState: { errors },
    control
  } = useFormContext<DDesignerFormType>()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.designerFormTypeDetails?.notes}>
            <Controller
              name='designerFormTypeDetails.notes'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Notes'
                    {...field}
                    error={Boolean(errors?.designerFormTypeDetails?.notes)}
                    fullWidth
                  />
                  {errors.designerFormTypeDetails?.notes && (
                    <FormHelperText>{errors.designerFormTypeDetails.notes.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.designerFormTypeDetails?.task_details}>
            <Controller
              name='designerFormTypeDetails.task_details'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Task Details'
                    {...field}
                    error={Boolean(errors?.designerFormTypeDetails?.task_details)}
                    fullWidth
                  />
                  {errors.designerFormTypeDetails?.task_details && (
                    <FormHelperText>{errors.designerFormTypeDetails.task_details.message}</FormHelperText>
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

export default DesignerSpecificDetails
