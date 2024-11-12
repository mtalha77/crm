import React from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ViewTicketDialog from 'src/layouts/components/dialogs/ViewTicketDialog'

const ChatTopBanner = ({ chatImage, chatName, ticketId, assigneeDepartmentName, departmentalTicket = false }) => {
  // Function to get initials from chatName
  const getInitials = name =>
    name
      .split(' ') // Split by spaces
      .slice(0, 2) // Take only the first two words
      .map(word => word.charAt(0).toUpperCase()) // Get the first letter of each word
      .join('') // Join the initials

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Space between to push ViewTicketDialog to the right
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light background with opacity
        backdropFilter: 'blur(10px)', // Apply blur effect
        borderRadius: 1,
        padding: 2,
        paddingRight: 5, // Added padding to the right side
        boxShadow: 1,
        width: '100%'
      }}
    >
      {/* Avatar for the chat image or initials from the chat name */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={chatImage || undefined} alt={chatName} sx={{ width: 48, height: 48, mr: 2 }}>
          {!chatImage && chatName && getInitials(chatName)}
        </Avatar>

        {/* Chat name */}
        <Typography
          variant='h6'
          sx={{
            color: 'text.primary',
            textTransform: 'capitalize' // Capitalize the first letter of each word
          }}
        >
          {chatName}
        </Typography>
      </Box>

      {/* View Ticket detail */}
      <ViewTicketDialog ticketId={ticketId} depart={assigneeDepartmentName} departmentalTicket={departmentalTicket} />
    </Box>
  )
}

export default ChatTopBanner
