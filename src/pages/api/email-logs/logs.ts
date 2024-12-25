import EmailLogModel from 'src/backend/schemas/emailLog.schema'

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      // Perform aggregation to fetch business_name and group data
      const logs = await EmailLogModel.aggregate([
        // Lookup to fetch business_name from the Business collection
        {
          $lookup: {
            from: 'businesses', // The name of the `Business` collection in the database
            localField: 'business_id',
            foreignField: '_id',
            as: 'businessDetails'
          }
        },
        {
          $unwind: {
            path: '$businessDetails',
            preserveNullAndEmptyArrays: true // Handle external contacts without a business_id
          }
        },
        {
          $group: {
            _id: { business_id: '$business_id', email: '$email' },
            business_name: { $first: '$businessDetails.business_name' },
            email: { $first: '$email' },
            is_external: { $first: '$is_external' },
            templates: {
              $push: {
                template_name: '$sent_templates.template_name',
                sent_at: '$sent_templates.sent_at'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            business_name: { $ifNull: ['$business_name', 'External Contact'] }, // Default name for external contacts
            email: 1,
            is_external: 1,
            templates: 1
          }
        }
      ])

      return res.status(200).json({ logs })
    } catch (error) {
      console.error('Error fetching email logs:', error)

      return res.status(500).json({ message: 'Failed to fetch email logs' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
