import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'

interface FilePreviewProps {
  files: File[]
  onRemove: (index: number) => void
}

const FilePreviewWrapper = styled('div')({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  mb: 2,
  maxHeight: 200,

  '::-webkit-scrollbar': {
    width: '12px'
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    borderRadius: '84px'
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '84px'
  },

  scrollbarWidth: 'thin',
  scrollbarColor: '#8866 transparent'
})

const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
  return (
    <FilePreviewWrapper>
      {files.map((file, index) => {
        const isImage = file.type.startsWith('image/')
        const objectUrl = URL.createObjectURL(file)

        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1,
              position: 'relative'
            }}
          >
            {isImage ? (
              <img
                src={objectUrl}
                alt={file.name}
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
              />
            ) : (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: 'grey.500',
                  color: 'text.primary'
                }}
              >
                <Icon icon='mdi:file' fontSize='1.5rem' />
              </Box>
            )}
            <Typography sx={{ ml: 1, flexGrow: 1 }} variant='body2'>
              {file.name}
            </Typography>
            <IconButton size='small' sx={{ position: 'absolute', top: 2, right: 2 }} onClick={() => onRemove(index)}>
              <Icon icon='mdi:close' />
            </IconButton>
          </Box>
        )
      })}
    </FilePreviewWrapper>
  )
}

export default FilePreview
