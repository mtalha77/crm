import mongoose from 'mongoose'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

async function getDepartmentBusinessStatus(user: any) {
  let businesses = []
  businesses = await BusinessModel.aggregate([
    //get all business tickets associated with each business
    {
      $lookup: {
        from: 'businesstickets',
        localField: '_id',
        foreignField: 'business_id',
        as: 'tickets'
      }
    },

    // filter business tickets based on their status to determine whether all tickets are completed
    {
      $addFields: {
        allTicketsCompleted: {
          $cond: {
            if: {
              $eq: [
                {
                  $size: {
                    $filter: { input: '$tickets', as: 'ticket', cond: { $ne: ['$$ticket.status', 'Completed'] } }
                  }
                },
                0
              ]
            },
            then: true,
            else: false
          }
        }
      }
    },

    // update the status of the business
    {
      $addFields: {
        status: {
          $cond: {
            if: '$allTicketsCompleted',
            then: 'Inactive',
            else: 'Active'
          }
        }
      }
    },

    // removing tickets field
    {
      $project: {
        tickets: 0 // Exclude tickets field if not needed
      }
    }
  ])

  return businesses
}
