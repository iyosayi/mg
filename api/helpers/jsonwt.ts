import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'
require('dotenv').config()

type ID = Types.ObjectId

interface IUserToken {
  id: string | ID
  email: string
}

const JWT_SECRET = process.env.JWT_SECRET
const createToken = (userId: IUserToken) => {
  return jwt.sign(userId, JWT_SECRET, { expiresIn: '1d' })
}

// const sendTokenResponse = (userId) => {
//   const token = createToken(userId)
//   return JSON.stringify({ token })
// }

const decodeToken = (details: string) => {
  return jwt.decode(details)
}

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
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
