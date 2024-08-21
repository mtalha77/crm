import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import uploadFiles from 'src/backend/middlewares/multer/uploadFiles'

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Upload files
    await new Promise((resolve, reject) => uploadFiles(req, res, err => (err ? reject(err) : resolve())))

    const { businessTicketId, content } = req.body

    // Process uploaded files
    const uploadedFiles = req.files
      ? req.files.map((file: any) => ({
          filename: file.originalname,
          url: file.path, // Use the Multer uploaded file path
          uploadedAt: new Date()
        }))
      : []

    // Validate request data
    if (!businessTicketId && !content && uploadedFiles.length < 0) {
      return res.status(400).json({ error: 'Invalid request data' })
    }

    // Check if business ticket exists
    const businessTicket = await BusinessTicketModel.findById(businessTicketId)
    if (!businessTicket) {
      return res.status(404).json({ error: 'Business ticket not found' })
    }



    // Create new message
    const newMessage = {
      content,
      sender: req.user._id,
      createdAt: new Date(),
      files: uploadedFiles
    }

    // Update the business ticket with the new message
    const updatedBusinessTicket = await BusinessTicketModel.findByIdAndUpdate(
      businessTicketId,
      { $push: { messages: newMessage } },
      { new: true }
    ).populate('messages.sender', '-password')

    // Return the latest message to the client
    const latestMessage = updatedBusinessTicket?.messages.slice(-1)[0]
    if (!latestMessage) {
      return res.status(500).json({ error: 'Failed to retrieve the latest message' })
    }

    res.status(200).json({
      message: 'Message sent successfully',
      payload: { latestMessage }
    })
  } catch (error) {
    console.error('Error processing request:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Apply the guard wrapper to protect the route
export default connectDb(guardWrapper(handler))
