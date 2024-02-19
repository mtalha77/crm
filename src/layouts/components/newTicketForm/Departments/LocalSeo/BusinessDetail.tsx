import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { LocalSeoWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const BusinessDetail = () => {
  const {
    formState: { errors },
    control
  }: any = useFormContext()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.gmbUrl}>
            <Controller
              name='businessDetail.gmbUrl'
              control={control}
              rules={{ required: 'GMB URL is required' }}
              render={({ field }) => (
                <>
                  <TextField label='GMB URL' {...field} error={Boolean(errors?.businessDetail?.gmbUrl)} fullWidth />
                  {errors.businessDetail?.gmbUrl && (
                    <FormHelperText>{errors.businessDetail.gmbUrl.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.notes}>
            <Controller
              name='businessDetail.notes'
              control={control}
              rules={{ required: 'Notes are required' }}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.businessDetail?.notes)} fullWidth />
                  {errors.businessDetail?.notes && (
                    <FormHelperText>{errors.businessDetail.notes.message}</FormHelperText>
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

export default BusinessDetail
