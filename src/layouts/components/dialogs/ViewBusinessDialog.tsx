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
import ViewFullBusinessDetails from '../ViewFullBusinessDetails'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ViewBusinessDialog = (props: any) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)

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
              <ViewFullBusinessDetails id={props.id} />
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
