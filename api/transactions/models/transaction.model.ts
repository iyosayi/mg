import moment from 'moment'
import { model, Schema, Types } from 'mongoose'
import {
  ITransactionSchema,
  ITransactionDoc
} from '../transaction-interfaces/i.transaction'

const tagEnum = [
  'ac',
  'bft',
  'srt',
  'anp',
  'ip',
  'dl',
  'pa',
  'dr',
  'sp',
  'cc',
  'bco'
]

const statusEnum = [
  'Awaiting Confirmation',
  'Transaction Accepted - Not funded',
  'Buyer Funded Transaction',
  'Accepted and Paid',
  'Seller rejects Transaction',
  'In progess',
  'Delivered',
  'Product Accepted',
  'Delivery Rejected',
  'Settlement Pending',
  'Completed'
]

const typeEnum = ['one-off', 'product', 'milestone']
const TransactionFields: Record<keyof ITransactionSchema, any> = {
  fullName: {
    type: String
  },
  inspectionPeriod: {
    type: Number
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: typeEnum,
    required: true,
    default: 'one-off'
  },
  currency: {
    type: String,
    enum: ['NGN', 'GHS']
  },
  dueDate: {
    type: Date,
    required: true
  },
  referenceId: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: moment().valueOf()
  },
  modifiedOn: {
    type: Date,
    default: moment().valueOf()
  },
  status: {
    type: String,
    enum: statusEnum,
    default: 'Awaiting Confirmation'
  },
  amount: { type: Number },
  source: {},
  initiatorId: { type: Types.ObjectId, email: String, ref: 'User' },
  tag: {
    type: String,
    enum: tagEnum,
    default: 'ac'
  },
  accepted: {
    type: Boolean,
    default: false
  },
  chargeBearer: {
    type: String,
    ref: 'User',
    required: true,
    enum: ['initiator', 'recipient'],
    default: 'initiator'
  },
  isTransactionFunded: {
    type: Boolean,
    default: false
  },
  shippingFee: Number,
  partyId: String,
  isTransactionCompleted: {
    type: Boolean,
    default: false
  }
}

export const TransactionSchema = new Schema(TransactionFields)
export const Transaction = model<ITransactionDoc>(
  'Transaction',
  TransactionSchema
)
