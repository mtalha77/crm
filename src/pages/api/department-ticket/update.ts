import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PUT') {
    const { role } = req.user

    if (!(role === UserRole.ADMIN || role === UserRole.SALE_EMPLOYEE))
      return res.status(403).send('Permission denied. Not authorized update ticket')

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
        ticketId
      } = req.body
      if (!assignee_depart_id || !assignee_depart_name || !due_date || !work_status || !ticketId)
        return res.status(400).send('Network Error')

      const updatedTicket = await DepartTicketModel.findByIdAndUpdate(
        { _id: ticketId },
        {
          $set: {
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
            no_of_gmb_reviews
          }
        }
      )

      if (!updatedTicket) throw new Error('Error while updating')

      console.log('Successfully updated')
      return res.send({
        message: 'Ticket Updated',
        payload: { _id: updatedTicket._id }
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
