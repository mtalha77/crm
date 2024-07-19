import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { HostingFormModel } from 'src/backend/schemas/hostingform.schema'
import mongoose from 'mongoose'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const {
        creation_date,
        hosting_name,
        expiration_date,
        price,
        live_status,
        list_status,
        hostingApprovedBy,
        hosting_holder,
        hosting_platform,
        notes,
        hosting_id
      } = req.body

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(500).send('You are not authorized to perform this action')

      const hostingExists = await HostingFormModel.findOne({
        hosting_name,
        _id: { $ne: new mongoose.Types.ObjectId(hosting_id) }
      })

      if (hostingExists) return res.status(500).send('Domain with that name already exists')

      const temp: any = {
        creation_date,
        hosting_name,
        expiration_date,
        price,
        live_status,
        list_status,
        hostingApprovedBy,
        hosting_holder,
        hosting_platform,
        notes
      }

      const updatedDomain = await HostingFormModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(hosting_id) },
        {
          $set: temp
        },
        { new: true }
      )

      if (!updatedDomain) return res.status(500).send('Not able to update hosting form. Please try again')

      return res.send({
        message: 'Domain Updated Successfully',
        payload: { hosting: updatedDomain }
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
