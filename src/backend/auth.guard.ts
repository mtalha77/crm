import BusinessModel from './schemas/business.schema'
import { BusinessTicketModel } from './schemas/businessTicket.schema'
import DepartTicketModel from './schemas/departTicket.schema'
import DepartmentModel from './schemas/department.schema'
import PaymentHistoryModel from './schemas/paymentHistory.schema'
import PaymentSessionModel from './schemas/paymentSession.schema'
import UserModel from './schemas/user.schema'
import { isAuthenticated } from './utils/isAuthenticated'
import { DomainFormModel } from './schemas/domianform.schema'
import { HostingFormModel } from './schemas/hostingform.schema'

// List of allowed IP addresses
const allowedIPs = ['122.129.69.89', '202.163.76.177', '127.0.0.1', '::1'] // Replace with your allowed IPs

export const guardWrapper = (handler: any) => async (req: any, res: any) => {
  try {
    // Retrieve the client's IP address
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('clientIP: ', clientIP)

    // Check if the client's IP is in the list of allowed IPs
    if (!allowedIPs.includes(clientIP)) {
      // Redirect to login page if IP is not whitelisted
      return res.redirect('https://crm-git-main-rank-orbits-projects.vercel.app/login/')
    }

    // Check if the request is authenticated or has the necessary permissions
    if (isAuthenticated(req) === false) {
      return res.status(401).send('Unauthorized')
    }

    // Models to initialize schemas
    DepartmentModel.schema
    UserModel.schema
    BusinessModel.schema
    BusinessTicketModel.schema
    DepartTicketModel.schema
    PaymentSessionModel.schema
    PaymentHistoryModel.schema
    DomainFormModel.schema
    HostingFormModel.schema

    // If authenticated and IP is allowed, proceed to the original handler
    return await handler(req, res)
  } catch (error) {
    console.error('Guard wrapper error:', error)

    return res.status(500).send('Internal Server Error')
  }
}
