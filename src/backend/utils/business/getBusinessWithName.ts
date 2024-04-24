import BusinessModel from 'src/backend/schemas/business.schema'

export const getBusinessWithName = async (name: string) => {
  return await BusinessModel.findOne({ business_name: name })
}
