import {Document} from 'mongoose'

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
}