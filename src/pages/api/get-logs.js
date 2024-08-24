import connectDb from 'src/backend/DatabaseConnection'
import LogModel from 'src/backend/schemas/logs.schema'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { startDate, endDate } = req.body

      const logs = await LogModel.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      })

      return res.send({
        message: 'logs fetched',
        payload: { logs }
      })
    } catch (error) {
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
