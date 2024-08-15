import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const {
        creation_date,
        domain_name,
        business,
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

      // Ensure the user is an admin
      if (req.user.role !== UserRole.ADMIN) {
        return res.status(403).send('You are not authorized to perform this action')
      }

      // Prepare the update object, only include fields that are present in the request
      const updateData: any = {}
      if (creation_date) updateData.creation_date = creation_date
      if (domain_name) updateData.domain_name = domain_name
      if (business) updateData.business = business
      if (expiration_date) updateData.expiration_date = expiration_date
      if (price) updateData.price = price
      if (live_status) updateData.live_status = live_status
      if (list_status) updateData.list_status = list_status
      if (domainApprovedBy) updateData.domainApprovedBy = domainApprovedBy
      if (domain_holder) updateData.domain_holder = domain_holder
      if (domain_platform) updateData.domain_platform = domain_platform
      if (notes) updateData.notes = notes

      // Update the domain in the database
      const updatedDomain = await DomainFormModel.findByIdAndUpdate(domain_id, { $set: updateData }, { new: true })

      if (!updatedDomain) {
        return res.status(404).send('Domain not found or unable to update')
      }

      return res.send({
        message: 'Domain Updated Successfully',
        payload: { domain: updatedDomain }
      })
    } catch (error) {
      console.error('Error updating domain:', error)
      res.status(500).send('An error occurred while updating the domain')
    }
  } else {
    res.status(405).send('Only POST requests are allowed')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
