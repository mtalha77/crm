// api/domain-forms/delete.ts
import connectDb from 'src/backend/DatabaseConnection'
import { DomainFormModel } from 'src/backend/schemas/domianform.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.query

      if (!_id) {
        return res.status(400).send('Domain ID is required')
      }

      const deletedDomain = await DomainFormModel.findByIdAndDelete(_id)

      if (!deletedDomain) {
        return res.status(404).send('Domain not found')
      }

      return res.send({
        message: 'Domain deleted successfully',
        payload: { deletedDomain }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(500).send('This is a DELETE request')
  }
}

export default connectDb(handler)
