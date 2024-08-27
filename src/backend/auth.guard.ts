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
import IpModel from './schemas/ip.schema'

const getIpList = async () => {
  const ips = await IpModel.find()

  return ips.map(ip => ip.ip)
}

const getGlobalAccessUsers = async () => {
  const users = await UserModel.find({ globalAccess: true })

  return users.map(user => user.user_name)
}

export const guardWrapper = (handler: any) => async (req: any, res: any) => {
  try {
    //load schemas
    UserModel.schema
    IpModel.schema

    // List of global access users
    const globalAccessUsers = await getGlobalAccessUsers()

    // List of allowed IP addresses
    const allowedIPs = await getIpList()

    // Retrieve the client's IP address
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log('clientIP: ', clientIP)

    // Retrieve the user's username
    const username = req.body?.user_name

    // Check if the client's IP is in the list of allowed IPs and not a global access user
    if (!allowedIPs.includes(clientIP) && !globalAccessUsers.includes(username)) {
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
