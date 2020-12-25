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

export interface IUserInput {
  email: string
  password: string
  phoneNumber: string
  source: {
    ip: string
    browser: string
    referrer: string | undefined
  }
}

export interface IUser extends IUserInput {
  fullName: string
  balance: number
  transactions: ID[]
  walletId: ID
  disputes: ID[]
  isEmailVerified: boolean
  link?: string
  createdOn: number | undefined
  modifiedOn: number
  businessName?: string
  address?: string
  cacNumber?: string
}

export interface IUserResult extends IUser {
  _id?: ID
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {}

export interface IUserDb {
  insert({ ...userInfo }: IUserInput): Promise<{ user: IUserDoc }>
  update({
    id,
    ...changes
  }: { id: string | ID } & IUserInput): Promise<IUserResult | null>
  findByEmail: ({ email }: { email: string }) => Promise<IUserResult> | null
  findById: ({ id: _id }: { id: string }) => Promise<IUserResult | null>
  findAll: () => Promise<IUserResult[]>
  remove: ({ id: _id }: { id: string }) => Promise<IUserResult | null>
}
