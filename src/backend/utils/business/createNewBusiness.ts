import { ClientSession } from 'mongoose'
import BusinessModel from 'src/backend/schemas/business.schema'

export const createNewBusiness = async (payload: any, session?: ClientSession) => {
  const newBusiness = new BusinessModel(payload)

  const temp = await newBusiness.save({ session })
  if (!temp) throw new Error('Something went wrong. Please try again')

  return temp
}
