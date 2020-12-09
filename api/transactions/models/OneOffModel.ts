import moment from 'moment'
import mongoose, {Types, Document, Model, Schema} from 'mongoose'

type ID = Types.ObjectId

enum StatusEnum {
  AwaitingConfirmation = "Awaiting Confirmation",
  BuyerFundedTransaction = "Buyer Funded Transaction",
  SellerRejectTransaction = "Seller Rejected Transaction",
  AcceptedPaid = "Accepted and Paid",
  InProgress = "In Progress",
  Delivered = "Delivered",
  ProductAccepted = "Product Accepted",
  DeliveryRejected = "Delivery Rejected",
  SettlementPending = "Settlement Pending",
  CompletedClosed = "Completed",
  BuyerConfirmedOrder = "Buyer Confirmed Order",
}

enum TagEnum {
  AC = "ac",
  BFT = "bft",
  SRT = "srt",
  ANP = "anp",
  IP = "ip",
  DL = "dl",
  PA = "pa",
  DR = "dr",
  SP = "sp",
  CC = "cc",
  BCO = "bco"
}


enum TypeEnum {
  OneOff = "one-off",
  Product = "product",
  Milestone = "milestone"
}

enum Currency {
  NGN = "NGN",
  GHS = "GHS"
}
export interface IOneOffTransaction {
  email: string
  phoneNumber: number
  title: string
  description: string
  type: TypeEnum 
  currency: Currency,
  inspectionPeriod: Date
  dueDate: Date
  reference: string
  createdOn: Date
  modifiedOn: Date
  status: StatusEnum
  amount: number
  source: object
  initiatorId: {
    _id: ID,
    email: string
  }
  tag: TagEnum
  accepted: boolean
  isPaid: boolean
  chargeBearer: ID
  partyId: string
  shippingFee: number

}

export interface IOneOffDoc extends IOneOffTransaction, Document {}
export interface IOneOffModel extends Model<IOneOffDoc> {}

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
const OneoffFields: Record<keyof IOneOffTransaction, any> = {
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
    required: true,
    default: 'one-off'
  },
  currency: {
    type: String,
    enum: ['NGN', 'GHS']
  },
  inspectionPeriod: {
    type: Date,
    required: true
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
  amount: { type: Number },
  source: {},
  initiatorId: { type: mongoose.Types.ObjectId, email: String, ref: 'User' },
  tag: {
    type: String,
    enum: tagEnum,
    default: 'ac'
  },
  accepted: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  chargeBearer: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingFee: Number,
  partyId: String
}

export const OneOffSchema = new Schema(OneoffFields)

