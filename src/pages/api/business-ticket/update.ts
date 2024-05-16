import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'PUT') {
    const { role } = req.user

    if (
      !(
        role === UserRole.ADMIN ||
        role === UserRole.SALE_EMPLOYEE ||
        role === UserRole.SALE_MANAGER ||
        role === UserRole.TEAM_LEAD
      )
    )
      return res.status(403).send('Permission denied. Not authorized update ticket')

    try {
      const {
        priority,
        assignee_depart_id,
        assignee_depart_name,
        client_reporting_date,
        remaining_price_date,

        // due_date,
        fronter,
        fronter_id,
        closer,
        closer_id,
        sales_type,
        notes,
        work_status,
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
        ticket_notes,
        task_details,
        ticketId,
        business_id
      } = req.body
      if (
        !assignee_depart_id ||
        !assignee_depart_name ||
        !closer ||
        !sales_type ||
        !closer_id ||
        !work_status ||
        !business_id ||
        !ticketId
      )
        return res.status(400).send('Network Error')

      if (sales_type === SaleType.NEW_SALE) if (!fronter || !fronter_id) return res.status(400).send('Network Error')

      // if (work_status) {
      //   const ticketExists = await BusinessTicketModel.exists({
      //     business_id: business_id,
      //     work_status: work_status,
      //     _id: { $ne: new mongoose.Types.ObjectId(ticketId) }
      //   })

      //   if (ticketExists) return res.status(400).send('This Business already exists with this work status.')
      // }

      let ticket_notes_formatted_text

      if (ticket_notes) {
        const trimmedText = ticket_notes
          .split('\n')
          .map((line: any) => line.trim())
          .filter((line: any) => line !== '')
        ticket_notes_formatted_text = trimmedText.join('\n')
      }

      const payload: any = {
        priority: priority,
        client_reporting_date: client_reporting_date,
        remaining_price_date: remaining_price_date,

        // due_date: due_date,
        closer: closer,
        sales_type: sales_type,
        notes: notes,
        work_status: work_status,
        closer_id: closer_id,
        service_name: service_name,
        service_area: service_area,
        referral_website: referral_website,
        service_location: service_location,
        key_words: key_words,
        login_credentials: login_credentials,
        console_access: console_access,
        analytics_access: analytics_access,
        paid_marketing_location: paid_marketing_location,
        ad_account_access: ad_account_access,
        budget: budget,
        budget_price: budget_price,
        clients_objectives: clients_objectives,
        facebook_url: facebook_url,
        no_of_backlinks,
        no_of_posts,
        no_of_blogs,
        platform_name,
        no_of_likes,
        no_of_gmb_reviews,
        gmb_access_email,
        task_details,
        ticket_notes: ticket_notes_formatted_text
      }

      const result = await BusinessTicketModel.findByIdAndUpdate({ _id: ticketId }, { $set: payload })
      if (!result) throw new Error('Something went wrong')

      return res.send({
        message: 'Ticket Updated',
        payload: { _id: result._id }
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
