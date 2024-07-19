import connectDb from 'src/backend/DatabaseConnection'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handle = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const {
        domain_name,
        creation_date,
        expiration_date,
        price,
        live_status,
        list_status,
        domainApprovedBy,
        domain_holder,
        domain_platform,
        notes
      } = req.body

      if (
        !domain_name &&
        !creation_date &&
        !expiration_date &&
        !price &&
        !live_status &&
        !list_status &&
        !notes &&
        !domain_holder &&
        !domain_platform &&
        !domainApprovedBy
      )
        return res.status(400).send('Fields Missing')

      const newDomain = new DomainFormModel({
        creation_date: creation_date,
        domain_name: domain_name,
        expiration_date: expiration_date,
        price: price,
        live_status: live_status,
        list_status: list_status,
        domainApprovedBy: domainApprovedBy,
        domain_holder: domain_holder,
        domain_platform: domain_platform,
        notes: notes
      })
      const savedDomain = await newDomain.save(newDomain)
      if (!savedDomain) return res.status(500).send('Not able to save domain')

      return res.send({
        message: 'Domain Saved',
        payload: { savedDomain }
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
