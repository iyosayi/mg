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
  link: string
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
export interface IUserDoc extends IUser, Document {
  _id: ID
}

export interface IUserModel extends Model<IUserDoc> {
  _id: ID
}

export interface UserDatabase {
  insert({ ...userInfo }: IUser): Promise<{user: IUserDoc, userToken: string}>
  update(id: string, ...changes: string[]): Promise<string[]>
  findByEmail: (email: string) => Promise<IUserDoc> | null
  findById(id: string): Promise<IUserDoc> | null
  findAll(): Array<IUser>
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
  }
  _id: string
  userToken: {
    token: string
    issued: number
    expires: number
  }
}

// export default userSchema
