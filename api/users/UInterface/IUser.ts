import { Document } from 'mongoose'
import { UserDocument } from '../model/userModel'

export interface IUser extends Document {
  email: string
  password: string
  phoneNumber: string
  source: {
    ip: string
    browser: string
    referrer: string
  }
  createdOn: Date
  modifiedOn: Date
  businessName?: string
  address?: string
  id?: string
  cacNumber?: string
}

export type UserResult = {
  user: {
    email: string
    password: string
    phoneNumber: string
    createdOn: Date
    businessName?: string
    address?: string
    source: {
      ip: string
      browser: string
      referrer: string
    }
    _id: string
  }
  userToken: {
    token: string
    issued: number
    expires: number
  }
}

export interface UserDatabase {
  insert({
    ...details
  }: IUser): Promise<{
    user: UserDocument
    userToken: { token: string; issued: number; expires: number }
  }>
  update(id: string, ...changes: string[]): Promise<string[]>
  findByEmail: (email: string) => Promise<UserDocument> | null 
  findById(id: string): Promise<UserDocument> | null
  findAll(): Array<IUser>
}
