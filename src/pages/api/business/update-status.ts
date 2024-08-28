import connectDb from 'src/backend/DatabaseConnection'

import { guardWrapper } from 'src/backend/auth.guard'

import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

import { UserRole } from 'src/shared/enums/UserRole.enum'

import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'

import { NextApiRequest, NextApiResponse } from 'next/types'

import BusinessModel from 'src/backend/schemas/business.schema'

interface UpdateStatusRequest extends NextApiRequest {
  body: {
    ticketId: string

    status: TicketStatus
  }

  user: {
    role: UserRole
  }
}

const handler = async (req: UpdateStatusRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests are allowed')
  }

  const { role } = req.user

  const { ticketId, status } = req.body

  if (![UserRole.ADMIN, UserRole.TEAM_LEAD].includes(role)) {
    return res.status(403).send('Permission denied. Only Admin and TeamLead can update the ticket')
  }

  if (!ticketId || !status) {
    return res.status(400).send('Fields Missing')
  }

  try {
    // Update the status of the ticket

    const updatedTicket = await BusinessTicketModel.findByIdAndUpdate(ticketId, { $set: { status } }, { new: true })

    if (!updatedTicket) {
      return res.status(500).send('Unable to update ticket. Please try again')
    }

    // Check if all tickets for the business are completed

    const businessId = updatedTicket.business_id

    const tickets = await BusinessTicketModel.find({ business_id: businessId })

    const allCompleted = tickets.every(ticket => ticket.status === TicketStatus.COMPLETED)

    if (allCompleted) {
      // Update business status to Inactive if all tickets are completed

      await BusinessModel.findByIdAndUpdate(businessId, {
        $set: { status: 'Inactive' }
      })
    }

    return res.send({
      message: `Ticket status changed to ${status}`,

      payload: {}
    })
  } catch (error) {
    console.error(error)

    return res.status(500).send('An error occurred while updating the ticket status')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)
export default connectDb(guardedHandler)

// import connectDb from 'src/backend/DatabaseConnection'
// import { guardWrapper } from 'src/backend/auth.guard'
// import BusinessModel from 'src/backend/schemas/business.schema'
// import { UserRole } from 'src/shared/enums/UserRole.enum'

// const handler = async (req: any, res: any) => {
//   if (req.method === 'POST') {
//     try {
//       if (
//         !(
//           req.user.role === UserRole.ADMIN ||
//           req.user.role === UserRole.SALE_MANAGER ||
//           req.user.role === UserRole.TEAM_LEAD
//         )
//       )
//         return res.status(403).send('Permission denied.Only Admin and Sales can update ticket')
//       const { id, status } = req.body
//       if (!id || !status) return res.status(400).send('Fields Missing')

//       const result = await BusinessModel.findByIdAndUpdate(id, {
//         $set: {
//           status: status
//         }
//       })

//       if (!result) return res.status(500).send('Not able to update ticket.Please try again')

//       return res.send({
//         message: `Business Status Changes to ${status}`,
//         payload: {}
//       })
//     } catch (error) {
//       console.log(error)
//       res.status(500).send('Network Error')
//     }
//   } else {
//     res.status(500).send('this is a post request')
//   }
// }

// // Apply the guard wrapper to the original handler
// const guardedHandler = guardWrapper(handler)

// export default connectDb(guardedHandler)
