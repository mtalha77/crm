import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

interface LoaderProps {
  size?: number // Size of the spinner
  message?: string // Optional loading message
  fullPage?: boolean // Whether the loader covers the full page
}

interface SectionLoaderProps {
  loading: boolean
  children: React.ReactNode
  overlay?: boolean // Whether to show an overlay
}

export const Loader: React.FC<LoaderProps> = ({ size = 40, message, fullPage = true }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...(fullPage
          ? {
              height: '100vh' // Full page height
            }
          : {
              padding: 4 // Centered in smaller containers
            })
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant='body2' color='textSecondary' sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({ loading, children, overlay = false }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: overlay ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: overlay ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
            zIndex: 10,
            pointerEvents: overlay ? 'none' : 'auto'
          }}
        >
          <Box
            sx={{
              padding: 4, // Adjust padding as needed
              backgroundColor: 'transparent' // Optional background for contrast
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      )}
    </Box>
  )
}
