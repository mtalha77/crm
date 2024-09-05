import mongoose from 'mongoose'

const connectDb = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  await mongoose.connect('mongodb+srv://crmrankbpo:8PQnqzqTnGeXnSAX@crmrankorbit.gq2hhuc.mongodb.net/crm')

  // await mongoose.connect('mongodb+srv://haiderdevrankorbit:haiderdevrankorbit123@cluster0.mwnvq.mongodb.net/crm')

  return handler(req, res)
}

export default connectDb
