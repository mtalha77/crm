import { Log } from 'src/shared/enums/Log.enum'
import LogModel from '../schemas/logs.schema'

export default async function createLog(obj: { msg: string; level?: Log }) {
  try {
    const newLog = new LogModel(obj)

    await newLog.save()

    // console.log(h)
  } catch (error) {
    console.log(error)
  }
}
