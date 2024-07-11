import connectDb from 'src/backend/DatabaseConnection'
import { HostingFormModel } from 'src/backend/schemas/hostingform.schema'

const handle = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const {
        hosting_name,
        business_name,
        creation_date,
        expiration_date,
        price,
        live_status,
        list_status,
        hostingApprovedBy,
        hosting_holder,
        hosting_platform,
        notes
      } = req.body

      if (
        !hosting_name &&
        !business_name &&
        !creation_date &&
        !expiration_date &&
        !price &&
        !live_status &&
        !list_status &&
        !notes &&
        !hosting_holder &&
        !hosting_platform &&
        !hostingApprovedBy
      )
        return res.status(400).send('Fields Missing')

      const newHosting = new HostingFormModel({
        creation_date: creation_date,
        hosting_name: hosting_name,
        business_name: business_name,
        expiration_date: expiration_date,
        price: price,
        live_status: live_status,
        list_status: list_status,
        hostingApprovedBy: hostingApprovedBy,
        hosting_holder: hosting_holder,
        hosting_platform: hosting_platform,
        notes: notes
      })
      const savedHosting = await newHosting.save(newHosting)
      if (!savedHosting) return res.status(500).send('Not able to save hosting')

      return res.send({
        message: 'Hosting Saved',
        payload: { savedHosting }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}
export default connectDb(handle)
