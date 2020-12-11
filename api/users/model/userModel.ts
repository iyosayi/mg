import { Schema, Document, Types, Model, Query } from 'mongoose'

type ID = Types.ObjectId

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
  createdOn: Date
  modifiedOn: Date
  businessName?: string
  address?: string
  cacNumber?: string
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
  createdOn: Date
  modifiedOn: Date
  businessName?: string
  address?: string
  cacNumber?: string
  __v: number | undefined
  _id: ID
  // userToken: {
  //   token: string
  //   issued: number
  //   expires: number
  // }
}

const UserSchemaFields: Record<keyof IUser, any> = {
  businessName: {
    type: String
  },
  address: { type: String },
  cacNumber: { type: String },
  email: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: Number,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createdOn: {
    type: Date
  },
  modifiedOn: {
    type: Date
  },
  balance: {
    type: Number,
    default: 20000
  },
  transactions: [{ type: Types.ObjectId, ref: 'Transaction' }],
  walletId: {
    type: Types.ObjectId,
    ref: 'Wallet'
  },
  source: {},
  disputes: [{ type: Types.ObjectId, ref: 'Dispute' }],
  isVerified: {
    type: Boolean,
    default: false
  },
  link: {
    type: Types.ObjectId,
    ref: 'Link'
  }
}

export const UserSchema = new Schema(UserSchemaFields)
export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {}

type FindById =
  | Omit<
      IUserResult,
      'source' | 'isVerified' | 'password' | '__v' | 'modifiedOn'
    >
  | undefined
export interface UserDatabase {
  insert({
    ...userInfo
  }: IUser): Promise<{ user: IUserResult; userToken: string }>
  update(id: ID, { ...changes }: IUser): Promise<IUserResult>
  findByEmail: (email: string) => Promise<IUserDoc> | null
  findById: ({ id: _id }: { id: ID }) => Promise<FindById>
  findAll: () => Promise<IUserDoc[]>
}
