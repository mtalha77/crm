import { isAuthenticated } from './utils/isAuthenticated'

export const guardWrapper = (handler: any) => async (req: any, res: any) => {
  try {
    // Check if the request is authenticated or has the necessary permissions

    if (isAuthenticated(req) === false) {
      return res.status(401).send('Unauthorized')
    }

    // If authenticated, proceed to the original handler
    return await handler(req, res)
  } catch (error) {
    console.error('Guard wrapper error:', error)

    return res.status(500).send('Internal Server Error')
  }
}
