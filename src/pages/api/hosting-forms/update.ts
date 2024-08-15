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
        hosting_id,
        business
      } = req.body

      console.log('Request received with body:', req.body)

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(403).send('You are not authorized to perform this action') // Use 403 for unauthorized access

      // Remove or adjust the uniqueness check if you want to allow duplicate names
      // const hostingExists = await HostingFormModel.findOne({
      //   hosting_name,
      //   _id: { $ne: new mongoose.Types.ObjectId(hosting_id) }
      // });

      // if (hostingExists) return res.status(409).send('Hosting with that name already exists');

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
        notes,
        business
      }

      console.log('Updating hosting with data:', temp)

      const updatedHosting = await HostingFormModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(hosting_id),
        { $set: temp },
        { new: true }
      )

      if (!updatedHosting) return res.status(404).send('Not able to update hosting form. Please try again')

      console.log('Hosting updated successfully:', updatedHosting)

      return res.send({
        message: 'Hosting Updated Successfully',
        payload: { hosting: updatedHosting }
      })
    } catch (error) {
      console.error('Error updating hosting:', error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(405).send('Method not allowed') // Use 405 for method not allowed
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
