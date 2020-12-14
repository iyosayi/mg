import { Schema, Types } from 'mongoose'
import { IUser } from '../user-interfaces/i.user'

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
    default: 0
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
