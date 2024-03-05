import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const {
        priority,
        assignee_depart_id,
        assignee_depart_name,
        due_date,
        work_status,
        notes,
        service_name,
        service_area,
        referral_website,
        service_location,
        key_words,
        login_credentials,
        console_access,
        analytics_access,
        paid_marketing_location,
        ad_account_access,
        budget,
        budget_price,
        clients_objectives,
        facebook_url,
        no_of_backlinks,
        no_of_posts,
        no_of_blogs,
        platform_name,
        no_of_likes,
        no_of_gmb_reviews,
        business_id,
        parentId
      } = req.body

      if (!assignee_depart_id || !assignee_depart_name || !due_date || !work_status || !business_id || !parentId)
        return res.status(400).send('Network Error')

      const { role } = req.user

      if (!(role === UserRole.TEAM_LEAD || role === UserRole.ADMIN)) return res.status(403).send('Permission denied.')

      const payload = {
        priority,
        created_by: req.user._id,
        assignee_depart_id,
        assignee_depart_name,
        assignor_depart_id: req.user.department_id,
        assignor_depart_name: req.user.department_name,
        due_date,
        work_status,
        notes,
        service_name,
        service_area,
        referral_website,
        service_location,
        key_words,
        login_credentials,
        console_access,
        analytics_access,
        paid_marketing_location,
        ad_account_access,
        budget,
        budget_price,
        clients_objectives,
        facebook_url,
        no_of_backlinks,
        no_of_posts,
        no_of_blogs,
        platform_name,
        no_of_likes,
        no_of_gmb_reviews,
        business_id,
        parent_id: new mongoose.Types.ObjectId(parentId)
      }

      const newTicket = new DepartTicketModel(payload)

      const result = await newTicket.save({ session })

      if (!result) return res.status(500).send('Not able to create ticket.Please try again')

      const parent = await BusinessTicketModel.findByIdAndUpdate(parentId, {
        $push: {
          child_tickets: { child_id: result._id }
        }
      })

      if (!parent) throw new Error('Network error')

      await session.commitTransaction()

      return res.send({
        message: 'Ticket Created',
        payload: { _id: result._id }
      })
    } catch (error) {
      // console.log(error)
      await session.abortTransaction()
      res.status(500).send('something went wrong')
    } finally {
      if (session) session.endSession()
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
