import { FormControl, FormHelperText, Grid, TextField, MenuItem, Select, InputLabel } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DWriterFormType } from 'src/interfaces/departmentalForms.interface'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { WriterWorkStatus } from 'src/shared/enums/WorkStatusType.enum'

const WriterSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control
  } = useFormContext<DWriterFormType>()

  return (
    <>
      <Grid container spacing={5}>
        {/* Notes Field */}
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

        {/* Task Details Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.task_details}>
            <Controller
              name='writerFormTypeDetails.task_details'
              control={control}
              disabled={user?.role === UserRole.TEAM_LEAD}
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

        {/* Work Status Field */}
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.work_status}>
            <InputLabel>Work Status</InputLabel>
            <Controller
              name='writerFormTypeDetails.work_status'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select
                  {...field}
                  label='Work Status'
                  error={Boolean(errors?.writerFormTypeDetails?.work_status)}
                  fullWidth
                >
                  <MenuItem value=''>None</MenuItem>
                  {Object.values(WriterWorkStatus).map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.writerFormTypeDetails?.work_status && (
              <FormHelperText>{errors.writerFormTypeDetails.work_status.message}</FormHelperText>
            )}
          </FormControl>
        </Grid> */}

        {/* Total Number for Writer Ticket Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.total_number_for_writer_ticket}>
            <Controller
              name='writerFormTypeDetails.total_number_for_writer_ticket'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    label='Total Number for Writer Ticket'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.total_number_for_writer_ticket)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.total_number_for_writer_ticket && (
                    <FormHelperText>
                      {errors.writerFormTypeDetails.total_number_for_writer_ticket.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        {/* Total Number of Words Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.total_number_of_words_writer_}>
            <Controller
              name='writerFormTypeDetails.total_number_of_words_writer_'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    type='number'
                    label='Total Number of Words'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.total_number_of_words_writer_)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.total_number_of_words_writer_ && (
                    <FormHelperText>
                      {errors.writerFormTypeDetails.total_number_of_words_writer_.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        {/* Keywords Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.key_words}>
            <Controller
              name='writerFormTypeDetails.key_words'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Keywords'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.key_words)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.key_words && (
                    <FormHelperText>{errors.writerFormTypeDetails.key_words.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        {/* Platform Name Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.platform_name}>
            <Controller
              name='writerFormTypeDetails.platform_name'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Platform Name'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.platform_name)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.platform_name && (
                    <FormHelperText>{errors.writerFormTypeDetails.platform_name.message}</FormHelperText>
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
