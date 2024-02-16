import jwt, { Secret } from 'jsonwebtoken'

const tokenSecret = process.env.JWT_SECRET as Secret

export const isAuthenticated = req => {
  try {
    const token = req.headers.authorization

    const decoded = jwt.verify(token, tokenSecret, { ignoreExpiration: false })
    req.user = decoded.user

    return true
  } catch (error) {
    // console.log(error)
    return false
  }
}
