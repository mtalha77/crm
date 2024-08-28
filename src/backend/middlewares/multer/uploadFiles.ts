import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from 'src/backend/config/cloudinary'

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'chatbox_files',
    resource_type: 'auto',
    public_id: `${Date.now()}-${file.originalname}` // Unique file name
  })
})

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
}).array('files')

// Middleware to handle file uploads and errors
export default function uploadFiles(req: any, res: any, next: any) {
  upload(req, res, err => {
    if (err) {
      const statusCode = err instanceof multer.MulterError ? 400 : 500
      console.error('File upload error:', err)

      return res.status(statusCode).json({
        error: 'File upload error',
        details: err.message
      })
    }
    next()
  })
}
