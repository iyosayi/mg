import { Schema, Types } from 'mongoose'
import { IWallet } from '../wallet-interfaces/i.wallet'

const walletFields: Record<keyof IWallet, any> = {
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  walletTransactions: [
    { type: Types.ObjectId, ref: 'WalletTransaction', required: true }
  ]
}

export const WalletSchema = new Schema(walletFields)
