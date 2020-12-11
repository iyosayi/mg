import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  bankAccount: {
    type: String
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
  transactions: [{ type: mongoose.Types.ObjectId, ref: 'Transaction' }],
  walletId: {
    type: mongoose.Types.ObjectId,
    ref: 'Wallet'
  },
  source: {},
  disputes: [{ type: mongoose.Types.ObjectId, ref: 'Dispute' }],
  isVerified: {
    type: Boolean,
    default: false
  },
  link: {
    type: mongoose.Types.ObjectId,
    ref: 'Link'
  }
})

export default userSchema
