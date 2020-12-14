import { Types, Document, Model } from 'mongoose'

export type ID = Types.ObjectId

export enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
  FEE = 'fee'
}

export interface IWallet {
  userId: ID
  userEmail: string
  balance: number
  walletTransactions: ID[]
}

export interface IWalletResult {
  userId: ID
  userEmail: string
  balance: number
  walletTransactions: ID[]
  _id: ID
}

export interface IWalletTransactions {
  amount: number
  operationType: string
  createdAt: number
  reference: string
  userId: ID
  destinationWalletId?: ID
}

export interface IWalletTransactionsResult {
  amount: number
  reference: string
  operationType: OperationType
  userId: ID
  destinationWalletId: ID
  createdAt: Date
  _id: ID
}

export type WithDraw = Omit<IWalletTransactions, 'destinationWalletId'>
export type Create = Omit<IWallet, 'balance' | 'walletTransactions'>
export type Deposit = Omit<IWalletTransactions, 'destinationWalletId'>
export type Wallet = Omit<IWalletTransactions, 'userId'>
export type Populated<M, K extends keyof M> = Omit<M, K> &
  { [P in K]: Exclude<M[P], ID[] | ID> }

/**
 * For wallet
 */
export interface IWalletDoc extends IWallet, Document {}
export interface IWalletModel extends Model<IWalletDoc> {}

/**
 * For wallet transactions
 */

export interface IWalletTransactionsDoc extends IWalletTransactions, Document {}
export interface IWalletTransactionsModel
  extends Model<IWalletTransactionsDoc> {}

export interface IWalletDb {
  create: ({ ...walletInfo }: Create) => Promise<IWalletResult>
  deposit: ({ ...walletDetails }: Deposit) => Promise<IWalletTransactionsResult>
  transfer: ({ ...walletDetails }: IWalletTransactions) => Promise<void>
  findByAccountId: ({ id: _id }: { id: ID }) => Promise<IWalletResult | null>
  findUserById: ({ id: _id }: { id: ID }) => Promise<IWalletResult | null>
  withdraw: ({
    ...walletDetails
  }: WithDraw) => Promise<{ wallet: IWalletTransactionsResult }>
  findTransactions: ({
    id: _id
  }: {
    id: ID
  }) => Promise<IWalletTransactionsResult | null>
}
