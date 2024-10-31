import { FormControl, FormHelperText, Grid, TextField, MenuItem } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { DWriterFormType } from 'src/interfaces/departmentalForms.interface'
import { useAuth } from 'src/hooks/useAuth'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { WriterWorkStatus, WriterWorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const getDynamicLabel = (workStatus: WriterWorkStatus | undefined) => {
  switch (workStatus) {
    case WriterWorkStatus.GMB_POST:
      return 'Total Number of GMB Posts'
    case WriterWorkStatus.PRESS_RELEASE_SUBMISSION:
      return 'Total Number of PR Submissions'
    case WriterWorkStatus.WEB_COPY:
      return 'Total Number of Web Copies'
    case WriterWorkStatus.BLOG:
      return 'Total Number of Blogs'
    case WriterWorkStatus.GUEST_POST:
      return 'Total Number of Guest Posts'
    case WriterWorkStatus.WEBSITE_CONTENT:
      return 'Total Number of Website Pages'
    case WriterWorkStatus.TAGLINE:
      return 'Total Number of Taglines'
    case WriterWorkStatus.REVIEWS:
      return 'Total Number of Reviews'
    default:
      return 'Total Number'
  }
}

const WriterSpecificDetails = () => {
  const { user } = useAuth()
  const {
    formState: { errors },
    control,
    watch
  } = useFormContext<DWriterFormType>()

  const selectedWorkStatus = watch('writerFormTypeDetails.work_status')
  const totalNumberLabel = getDynamicLabel(selectedWorkStatus)

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.work_status}>
            <Controller
              name='writerFormTypeDetails.work_status'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    select
                    label='Work Status'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.work_status)}
                    fullWidth
                  >
                    {WriterWorkStatusValues.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors.writerFormTypeDetails?.work_status && (
                    <FormHelperText>{errors.writerFormTypeDetails.work_status.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.total_number_for_writers_depart}>
            <Controller
              name='writerFormTypeDetails.total_number_for_writers_depart'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label={totalNumberLabel}
                    type='number'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.total_number_for_writers_depart)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.total_number_for_writers_depart && (
                    <FormHelperText>
                      {errors.writerFormTypeDetails.total_number_for_writers_depart.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.total_number_of_words_writers_depart}>
            <Controller
              name='writerFormTypeDetails.total_number_of_words_writers_depart'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='No. Of Words'
                    type='number'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.total_number_of_words_writers_depart)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.total_number_of_words_writers_depart && (
                    <FormHelperText>
                      {errors.writerFormTypeDetails.total_number_of_words_writers_depart.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.writerFormTypeDetails?.keywords_for_writers_depart}>
            <Controller
              name='writerFormTypeDetails.keywords_for_writers_depart'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Keywords'
                    {...field}
                    error={Boolean(errors?.writerFormTypeDetails?.keywords_for_writers_depart)}
                    fullWidth
                  />
                  {errors.writerFormTypeDetails?.keywords_for_writers_depart && (
                    <FormHelperText>{errors.writerFormTypeDetails.keywords_for_writers_depart.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
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
