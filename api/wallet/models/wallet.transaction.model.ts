import { Schema, Types } from 'mongoose'
import { IWalletTransactions } from '../wallet-interfaces/i.wallet'

const types = ['deposit', 'withdraw', 'transfer', 'fee']
const WalletTransactionFields: Record<keyof IWalletTransactions, any> = {
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  reference: {
    type: String
  },
  operationType: {
    type: String,
    required: true,
    enum: types
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationWalletId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date }
}

export const WalletTransactionSchema = new Schema(WalletTransactionFields)
