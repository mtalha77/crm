// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Icon from 'src/@core/components/icon'

import { Slide, Tooltip, Icon as MuiIcon, Card, CardHeader, Divider, CardContent } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

const BoldText = ({ children }: any) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ViewBusinessDialog = (props: any) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const { data } = props

  return (
    <>
      <Tooltip title='View'>
        <MuiIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShow(true)
          }}
        >
          <VisibilityIcon />
        </MuiIcon>
      </Tooltip>
      <Dialog
        fullScreen
        open={show}
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            backgroundColor: '#282A42',
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <Card>
            <CardHeader
              title={
                <Typography variant='h5' color={'primary'}>
                  Business Details
                </Typography>
              }
            />
            <Divider sx={{ m: '0 !important' }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <BoldText>Status:</BoldText> {data?.status}
                </Grid>
                <Grid item xs={6}>
                  <BoldText>Name:</BoldText> {data?.business_name}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Email:</BoldText> {data?.business_email}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Number:</BoldText> {data?.business_number}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Hours:</BoldText> {data?.business_hours}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Country:</BoldText> {data?.country}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>State:</BoldText> {data?.state}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Street:</BoldText> {data?.street}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>ZipCode:</BoldText> {data?.zip_code}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Website Url:</BoldText> {data?.website_url}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Social Profile:</BoldText> {data?.social_profile}
                </Grid>

                <Grid item xs={6}>
                  <BoldText>Gmb Url:</BoldText> {data?.gmb_url}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#282A42',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        ></DialogActions>
      </Dialog>
    </>
  )
}

export default ViewBusinessDialog
