import { Types, Document, Model } from 'mongoose'

export type ID = Types.ObjectId

export enum StatusEnum {
  AwaitingConfirmation = 'Awaiting Confirmation',
  BuyerFundedTransaction = 'Buyer Funded Transaction',
  SellerRejectTransaction = 'Seller Rejected Transaction',
  AcceptedPaid = 'Accepted and Paid',
  InProgress = 'In Progress',
  Delivered = 'Delivered',
  ProductAccepted = 'Product Accepted',
  DeliveryRejected = 'Delivery Rejected',
  SettlementPending = 'Settlement Pending',
  CompletedClosed = 'Completed',
  BuyerConfirmedOrder = 'Buyer Confirmed Order'
}

enum TagEnum {
  AC = 'ac',
  BFT = 'bft',
  SRT = 'srt',
  ANP = 'anp',
  IP = 'ip',
  DL = 'dl',
  PA = 'pa',
  DR = 'dr',
  SP = 'sp',
  CC = 'cc',
  BCO = 'bco'
}

export enum ChargeBearer {
  INITIATOR = 'initiator',
  RECIPIENT = 'recipient'
}

export enum TypeEnum {
  OneOff = 'one-off',
  Product = 'product',
  Milestone = 'milestone'
}

export enum Currency {
  NGN = 'NGN',
  GHS = 'GHS'
}

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

interface ShortId {
  (): string
  generate: () => string
}

export interface ITransactionUtils {
  makeSource: (source: ISourceInput) => ISource
  isValidEmail: (email: string) => boolean
  uuidv4: () => string
  upperFirst: (word: string) => string
  shortid: ShortId
}

/**
 * Database method interfaces
 *
 */

export interface ITransaction {
  email: string
  phoneNumber: number
  title: string
  description: string
  currency: string
  type: string
  dueDate: number
  amount: number
  chargeBearer: string
  source: ISourceInput
  referenceId: string
  initiatorId: string | ID
  partyId: string
}

export interface ITransactionResult extends ITransaction {
  _id: ID
  status: string
  accepted: boolean
}

export interface ITransactionFactory extends ITransaction {
  type: string
}

export interface ITransactionSchema extends ITransactionFactory {
  fullName: string
  status: string
  inspectionPeriod: number
  source: {
    ip: string
    browser: string
    referrer: string | undefined
  }
  createdOn: Date
  modifiedOn: Date
  tag: TagEnum
  accepted: boolean
  shippingFee: number
  isTransactionCompleted: boolean
  isTransactionFunded: boolean
}

export interface ITransactionDoc extends ITransactionSchema, Document {}
export interface ITransactionModel extends Model<ITransactionDoc> {}

export interface ITransactionDb {
  insert({ ...transactionDetails }: ITransaction): Promise<ITransactionResult>
  update({
    id,
    ...changes
  }: {
    id: string | ID
  } & ITransactionResult): Promise<ITransactionResult | null>
  remove({ id: _id }: { id: string | ID }): Promise<ITransactionDoc | null>
  findById({ id: _id }: { id: string | ID }): Promise<ITransactionResult | null>
  findByRef({
    referenceId
  }: {
    referenceId: string
  }): Promise<ITransactionResult | null>
  findAll(): Promise<ITransactionResult[]>
}
