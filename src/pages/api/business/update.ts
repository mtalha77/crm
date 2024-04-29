import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'

import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PUT') {
    const { role } = req.user

    if (!(role === UserRole.ADMIN || role === UserRole.TEAM_LEAD || req.user.role === UserRole.SALE_MANAGER))
      return res.status(403).send('Permission denied. Not authorized update ticket')

    try {
      const {
        business_name,
        business_email,
        business_number,
        business_hours,
        state,
        country,
        zip_code,
        street,
        website_url,
        social_profile,
        businessId,
        gmb_url,
        client_name
      } = req.body
      if (!businessId) return res.status(400).send('Network Error')

      const businessExists = await BusinessModel.exists({
        business_name: business_name,
        _id: { $ne: new mongoose.Types.ObjectId(businessId) }
      })
      if (businessExists) return res.status(400).send('Business already exists with this business name.')

      const updated = await BusinessModel.findByIdAndUpdate(businessId, {
        $set: {
          business_name,
          business_email,
          business_number,
          business_hours,
          state,
          country,
          zip_code,
          street,
          website_url,
          social_profile,
          gmb_url,
          client_name
        }
      })

      if (!updated) return res.status(400).send('Network Error')

      return res.send({
        message: 'Business Updated',
        payload: { _id: updated._id }
      })
    } catch (error) {
      console.log(error)

      return res.status(500).send('Not able to update ticket.Please try again')
    }
  } else {
    res.status(500).send('this is a put request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
