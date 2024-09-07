import mongoose from 'mongoose'

const connectDb = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  // Fetch the connection string from the .env file
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in .env')
  }

  await mongoose.connect(mongoUri)

  return handler(req, res)
}

export default connectDb
