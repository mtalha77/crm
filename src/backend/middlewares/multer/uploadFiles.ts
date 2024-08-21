import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from 'src/backend/config/cloudinary'

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'chatbox_files',
    resource_type: 'auto',
    // allowed_formats: ['pdf', 'docx', 'xlsx', 'txt'], // Allowed file extensions
    public_id: `${Date.now()}-${file.originalname}` // Unique file name
  })
})

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
}).array('files')

export default function uploadFiles(req: NextApiRequest, res: NextApiResponse, next: Function) {
  console.log('Request files:', req.files)

  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err)

      return res.status(400).json({ error: 'File upload error', details: err.message })
    } else if (err) {
      console.error('File error:', err)

      return res.status(500).json({ error: 'Server error during file upload' })
    }

    // Proceed to the next middleware/handler
    next()
  })
}
