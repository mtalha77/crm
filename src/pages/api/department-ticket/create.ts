import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { Department } from 'src/shared/enums/Department.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
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
        total_number_for_writers_depart,
        total_number_of_words_writers_depart,
        keywords_for_writers_depart,
        gmb_access_email,
        task_details,
        business_id
      } = req.body

      if (assignee_depart_name !== Department.Writer && assignee_depart_name !== Department.Designer && !work_status)
        return res.status(400).send('Network Error')

      if (!assignee_depart_id || !assignee_depart_name || !due_date || !business_id)
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
        gmb_access_email,
        task_details,
        business_id,
        total_number_for_writers_depart,
        total_number_of_words_writers_depart,
        keywords_for_writers_depart
      }

      const newTicket = new DepartTicketModel(payload)

      const result = await newTicket.save()

      if (!result) return res.status(500).send('Not able to create ticket.Please try again')

      return res.send({
        message: 'Ticket Created',
        payload: { _id: result._id }
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
