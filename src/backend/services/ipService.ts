import IpModel from '../schemas/ip.schema'
import UserModel from '../schemas/user.schema'

export const getIpList = async () => {
  const ips = await IpModel.find()

  return ips.map(ip => ip.ip)
}

export const getGlobalAccessUsers = async () => {
  const users = await UserModel.find({ globalAccess: true })

  return users.map(user => user.user_name)
}

export const verifyIp = async (req: any) => {
  try {
    // List of global access users
    const globalAccessUsers = await getGlobalAccessUsers()

    // List of allowed IP addresses
    const allowedIPs = await getIpList()

    // Check IP address
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    console.log('clientIP: ', clientIP)

    // Retrieve the user's username
    const username = req.body?.user_name

    // Check if the client's IP is in the list of allowed IPs and not a global access user
    if (!allowedIPs.includes(clientIP) && !globalAccessUsers.includes(username)) {
      return false
    }

    return true
  } catch (error) {
    console.log('error verifying clientIP', error)

    return false
  }
}
