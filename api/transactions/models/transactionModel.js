import moment from 'moment'
import mongoose from 'mongoose'

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
const transactionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
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
    default: 'one-off'
  },
  inspectionPeriod: {
    type: Date,
    // required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  reference: {
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
  productTitle: String,
  amount: { type: Number },
  source: {},
  initiator: { type: mongoose.Types.ObjectId, email: String, ref: 'User' },
  tag: {
    type: String,
    enum: tagEnum,
    default: 'ac'
  },
  accepted: {
    type: Boolean,
    default: false
  },
  products: [],
  milestones: [],
  isPaid: {
    type: Boolean,
    default: false
  },
  quantity: Number,
  chargeBearer: {
    type: String,
    ref: 'User',
    required: true,
    enum: ["initiator", 'recipient'],
    default: 'initiator'
  },
  shippingFee: Number,
  partyId: String
})

export default transactionSchema
