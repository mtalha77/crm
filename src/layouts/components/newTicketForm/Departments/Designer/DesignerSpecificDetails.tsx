import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth';
import { DDesignerFormType } from 'src/interfaces/departmentalForms.interface'
import { UserRole } from 'src/shared/enums/UserRole.enum';
import { DesignerWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const DesignerSpecificDetails = () => {

  const { user } = useAuth()

  const {
    formState: { errors },
    control
  } = useFormContext<DDesignerFormType>()

  return (
    <>
      <Grid container spacing={5}>
        {/* Work Status Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.designerFormTypeDetails?.work_status}>
            <InputLabel htmlFor='designerWorkStatus'>Work Status</InputLabel>
            <Controller
              name='designerFormTypeDetails.work_status'
              control={control}
              rules={{ required: true }} // Validation: Required
              defaultValue=''
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth disabled={user?.role === UserRole.TEAM_LEAD}>
                    {DesignerWorkStatusValues.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.designerFormTypeDetails?.work_status && (
                    <FormHelperText>{errors.designerFormTypeDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        {/* Notes Field */}
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

        {/* Task Details Field */}
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
