import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

type ID = Types.ObjectId

interface IUserid {
  id: ID
  email: string
}

const JWT_SECRET = process.env
const createToken = (userId: IUserid, secret: string) => {
  return jwt.sign(userId, secret, { expiresIn: '1d' })
}

// const sendTokenResponse = (userId) => {
//   const token = createToken(userId)
//   return JSON.stringify({ token })
// }

const decodeToken = (details: string) => {
  return jwt.decode(details)
}

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 12)
  return hashed
}

const validatePassword = async (password: string, password2: string) => {
  const validPassord = await bcrypt.compare(password, password2)
  return validPassord
}

export {
  createToken,
  // sendTokenResponse,
  decodeToken,
  verifyToken,
  hashPassword,
  validatePassword
}
