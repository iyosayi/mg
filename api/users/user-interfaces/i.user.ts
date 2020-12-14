import { Document, Types, Model } from 'mongoose'

export type ID = Types.ObjectId
export interface ISource {
  getIp: () => string
  getBrowser: () => string
  getReferrer: () => string | undefined
}

export interface ISourceInput {
  ip: string
  browser: string
  referrer: string | undefined
}

export interface IUser {
  email: string
  password: string
  phoneNumber: string
  balance: number
  transactions: ID[]
  walletId: ID
  disputes: ID[]
  isVerified: boolean
  link?: string
  source: {
    ip: string
    browser: string
    referrer: string | undefined
  }
  createdOn: number | undefined
  modifiedOn: number
  businessName?: string
  address?: string
  cacNumber?: string
}

export interface IUserInput {
  email: string
  password: string
  phoneNumber: string
  source: {
    ip: string
    browser: string
    referrer: string | undefined
  }
  createdOn?: number | undefined
  modifiedOn: number
  id?: ID
}

export interface IUserResult {
  email: string
  password: string
  phoneNumber: string
  balance: number
  transactions: ID[]
  walletId: ID
  disputes: ID[]
  isVerified: boolean
  link?: string
  source: {
    ip: string
    browser: string
    referrer: string | undefined
  }
  createdOn?: number | undefined
  modifiedOn: number
  businessName?: string
  address?: string
  cacNumber?: string
  __v: number | undefined
  _id: ID
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {}

export interface IUserDb {
  insert({
    ...userInfo
  }: IUserInput): Promise<{ user: IUserResult; userToken: string }>
  update({ ...changes }: IUserInput): Promise<any>
  findByEmail: (email: string) => Promise<IUserDoc> | null
  findById: ({ id: _id }: { id: ID }) => Promise<IUserDoc | null>
  findAll: () => Promise<IUserDoc[]>
  remove: ({ id: _id }: { id: ID }) => Promise<IUserDoc | null>
}
