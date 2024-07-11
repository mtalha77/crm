import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'
import mongoose from 'mongoose'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const {
        creation_date,
        domain_name,
        business_name,
        expiration_date,
        price,
        live_status,
        list_status,
        domainApprovedBy,
        domain_holder,
        domain_platform,
        notes,
        domain_id
      } = req.body

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(500).send('You are not authorized to perform this action')

      const domainExists = await DomainFormModel.findOne({
        domain_name,
        _id: { $ne: new mongoose.Types.ObjectId(domain_id) }
      })

      if (domainExists) return res.status(500).send('Domain with that name already exists')

      const temp: any = {
        creation_date,
        domain_name,
        business_name,
        expiration_date,
        price,
        live_status,
        list_status,
        domainApprovedBy,
        domain_holder,
        domain_platform,
        notes
      }

      const updatedDomain = await DomainFormModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(domain_id) },
        {
          $set: temp
        },
        { new: true }
      )

      if (!updatedDomain) return res.status(500).send('Not able to update domain form. Please try again')

      return res.send({
        message: 'Domain Updated Successfully',
        payload: { domain: updatedDomain }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
