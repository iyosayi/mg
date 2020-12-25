import { Types, Document, Model } from 'mongoose'

export type ID = Types.ObjectId

/**
 * Interface describing the escrow model
 */

export interface IEscrowFactory {
  amountPaid: number
  buyerId: string | ID
  referenceId: string
}

export interface IEscrow extends IEscrowFactory {
  escrowCharge: number
  transactionId: ID
  isTransactionFunded: boolean
  paymentMadeAt: Date
  createdAt: Date
  updatedAt: Date
  hasCustomerBeingPaid: boolean
  referenceId: string
}

/**
 * Expected values returned from a new escrow document
 */
export interface IEscrowResult extends IEscrow {
  _id: ID
}

/**
 * Interface describing the dependency in the escrow factory
 */
export interface IUuid {
  uuidv4: () => string
}

/**
 * For the escrow factory function
 */
export type EscrowFactory = Pick<
  IEscrow,
  'amountPaid' | 'buyerId' | 'referenceId'
>

/**
 * For the deposit method of the escrow database
 */
export type EscrowDeposit = Omit<
  IEscrow,
  'paymentMadeAt' | 'hasCustomerBeingPaid' | 'createdAt' | 'updatedAt'
>

export interface IEscrowDoc extends IEscrow, Document {}
export interface IEscrowModel extends Model<IEscrowDoc> {}

/**
 * Interface describing the structure of the escrow database
 */
export interface IEscrowDb {
  findById({ id: _id }: { id: ID }): Promise<IEscrowDoc | null>
  findByRef({ ref }: { ref: string }): Promise<IEscrowDoc | null>
  initiateMoneyTransfer({
    receiverId,
    amountPaid,
    transactionId,
    escrowCharge
  }: {
    transactionId: string | ID
    receiverId: string | ID
    amountPaid: number
    escrowCharge: number
  }): Promise<void>

  deposit({ ...transactionDetails }: EscrowDeposit): Promise<IEscrowDoc>
  findEscrow({
    transactionId
  }: {
    transactionId: string | ID
  }): Promise<IEscrowResult | null>
  findAll(): Promise<IEscrowResult[]>
  update({
    id,
    ...escrowDetails
  }: { id: string | ID } & IEscrow): Promise<IEscrowDoc>
}
