import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import PaymentSessionModel from 'src/backend/schemas/paymentSession.schema'
import { createNewBusiness } from 'src/backend/utils/business/createNewBusiness'
import { getBusinessWithName } from 'src/backend/utils/business/getBusinessWithName'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { role } = req.user

    if (!(role === UserRole.ADMIN || role === UserRole.SALE_EMPLOYEE || req.user.role === UserRole.SALE_MANAGER))
      return res.status(403).send('Permission denied.Only Admin and Sales can create ticket')

    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const {
        priority,
        assignee_depart_id,
        assignee_depart_name,
        client_reporting_date,
        due_date,
        fronter,
        fronter_id,
        closer,
        closer_id,
        sales_type,
        notes,
        payment_history,
        business_name,
        business_number,
        business_hours,
        business_email,
        state,
        country,
        street,
        zip_code,
        social_profile,
        website_url,
        work_status,
        gmb_url,
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
      } = req.body
      if (
        !assignee_depart_id ||
        !assignee_depart_name ||
        !due_date ||
        !closer ||
        !sales_type ||
        !payment_history ||
        !business_name ||
        !business_email ||
        !closer_id ||
        !work_status
      )
        return res.status(400).send('Network Error')

      if (sales_type === SaleType.NEW_SALE) if (!fronter || !fronter_id) return res.status(400).send('Network Error')

      const business = await getBusinessWithName(business_name)
      let busines_id = business?._id
      if (business?.work_status.includes(work_status)) {
        return res.status(400).send('Business already exists with this work status.')
      }
      let newBusiness
      if (!business) {
        //create new business
        newBusiness = await createNewBusiness(
          {
            business_name,
            business_number,
            business_hours,
            business_email,
            state,
            country,
            street,
            zip_code,
            social_profile,
            website_url,
            work_status: [work_status],
            gmb_url
          },
          session
        )
        busines_id = newBusiness?._id
      } else {
        await BusinessModel.findByIdAndUpdate(business._id, { $push: { work_status: work_status } }, { session })
      }

      const payload: any = {
        priority,
        created_by: req.user._id,
        assignee_depart_id: new mongoose.Types.ObjectId(assignee_depart_id),
        assignee_depart_name,
        assignor_depart_id: req.user.department_id,
        assignor_depart_name: req.user.department_name,
        client_reporting_date,
        due_date,
        closer,
        business_id: busines_id,
        sales_type,
        notes,
        work_status,
        closer_id,
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
      if (sales_type === SaleType.NEW_SALE) {
        payload.fronter = fronter
        payload.fronter_id = fronter_id
      }
      const newTicket = new BusinessTicketModel(payload)

      const result = await newTicket.save({ session })

      if (!result) throw new Error('Not able to create ticket.Please try again')

      const { total_payment, advance_payment, remaining_payment } = payment_history[0]

      const paymentSession = new PaymentSessionModel({
        total_payment,
        advance_payment,
        remaining_payment: total_payment - advance_payment,
        sales_type: sales_type,
        fronter_id: sales_type === SaleType.NEW_SALE ? fronter_id : undefined,
        closer_id,
        ticket_id: result._id,
        business_id: result.business_id,
        session: 1
      })

      const result2 = await paymentSession.save({ session })

      if (!result2) throw new Error('Not able to create ticket.Please try again')

      const paymentHistory = new PaymentHistoryModel({
        received_amount: advance_payment,
        payment_type: PaymentType.Credit,
        remaining_amount: total_payment - advance_payment,
        ticket_id: result._id,
        payment_session_id: result2._id,
        business_id: result.business_id,
        session: 1,
        sales_type: sales_type,
        fronter_id: sales_type === SaleType.NEW_SALE ? fronter_id : undefined,
        closer_id
      })
      const result3 = await paymentHistory.save({ session })
      if (!result3) throw new Error('Not able to create ticket.Please try again')

      await session.commitTransaction()

      return res.send({
        message: 'Ticket Created',
        payload: { _id: result._id }
      })
    } catch (error) {
      console.log(error)
      await session.abortTransaction()

      return res.status(500).send('something went wrong')
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
