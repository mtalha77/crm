import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'

const templates = [
  {
    title: 'Christmas',
    image: 'https://rankorbit.com/wp-content/uploads/2022/12/Christmas-@4x-1536x618.png',
    path: '/view-email-logs/templates/christmas'
  },
  {
    title: 'New Year',
    image: 'https://rankorbit.com/wp-content/uploads/2022/12/Christmas-@4x-1536x618.png',
    path: '/view-email-logs/templates/newYear'
  }
]

export default function TemplatesOverview() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        marginTop: 4
      }}
    >
      {templates.map(template => (
        <Card
          key={template.title}
          sx={{ width: 300, cursor: 'pointer' }}
          onClick={() => handleCardClick(template.path)}
        >
          <CardMedia component='img' height='140' image={template.image} alt={template.title} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {template.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
