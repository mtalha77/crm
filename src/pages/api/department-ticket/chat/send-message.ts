import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import uploadFiles from 'src/backend/middlewares/multer/uploadFiles'

export const config = {
  api: {
    bodyParser: false // Disable body parsing as multer handles it
  }
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await uploadFilesAsync(req, res)

    const { departmentTicketId, content } = req.body

    // Validate request data
    if (!departmentTicketId && !content && !req.files?.length) {
      return res.status(400).json({ error: 'Invalid request data' })
    }

    // Check if the business ticket exists
    const departmentTicket = await DepartTicketModel.findById(departmentTicketId)
    if (!departmentTicket) {
      return res.status(404).json({ error: 'Business ticket not found' })
    }

    // Prepare new message data
    const newMessage = {
      content,
      sender: req.user._id,
      createdAt: new Date(),
      files: req.files.map(file => ({
        filename: file.originalname,
        url: file.path,
        uploadedAt: new Date()
      }))
    }

    // Update the business ticket with the new message
    const updatedDepartmentTicket = await DepartTicketModel.findByIdAndUpdate(
      departmentTicketId,
      { $push: { messages: newMessage } },
      { new: true }
    ).populate('messages.sender', '-password')

    // Return the latest message to the client
    const latestMessage = updatedDepartmentTicket?.messages.slice(-1)[0]
    if (!latestMessage) {
      throw new Error('Failed to retrieve the latest message')
    }

    res.status(200).json({
      message: 'Message sent successfully',
      payload: { latestMessage }
    })
  } catch (error: any) {
    console.error('Error processing request:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

// Helper function to promisify the multer upload
function uploadFilesAsync(req: any, res: any) {
  return new Promise((resolve, reject) => {
    uploadFiles(req, res, (err: any) => (err ? reject(err) : resolve()))
  })
}

// Apply the guard wrapper to protect the route
export default connectDb(guardWrapper(handler))
