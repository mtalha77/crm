import mongoose from 'mongoose'

const connectDb = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  await mongoose.connect('mongodb://localhost:27017/crm-local')

  return handler(req, res)
}

export default connectDb
