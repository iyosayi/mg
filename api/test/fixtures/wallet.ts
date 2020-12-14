import { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import faker from 'faker'
import {
  Deposit,
  IWalletTransactions,
  Wallet
} from '../../wallet/wallet-interfaces/i.wallet'

const Id = Object.freeze({
  makeId: Types.ObjectId
})

export const makeFakeWallet = (overrides?: object) => {
  const wallet = {
    userId: Id.makeId(),
    userEmail: faker.internet.email(),
    balance: 40000,
    walletTransactions: []
  }

  return {
    ...wallet,
    ...overrides
  }
}

export const makeFakeDeposit = (overrides?: object) => {
  const walletDetails: Deposit = {
    amount: 4000,
    operationType: 'deposit',
    createdAt: Date.now(),
    reference: uuidv4(),
    userId: Id.makeId()
  }

  return {
    ...walletDetails,
    ...overrides
  }
}

export const makeFakeTransfer = (overrides?: object) => {
  const walletDetails: IWalletTransactions = {
    amount: 4000,
    operationType: 'transfer',
    createdAt: Date.now(),
    reference: uuidv4(),
    userId: Id.makeId(),
    destinationWalletId: Id.makeId()
  }

  return {
    ...walletDetails,
    ...overrides
  }
}

export const makeFakeWithdrawal = (overrides?: object) => {
  const walletDetails = {
    amount: 0,
    operationType: 'withdraw',
    createdAt: Date.now(),
    reference: uuidv4(),
    userId: Id.makeId()
  }

  return {
    ...walletDetails,
    ...overrides
  }
}

export const makeFakeWalletTransaction = (overrides?: object) => {
  const walletTransactions = {
    amount: 20000,
    operationType: 'deposit',
    createdAt: Date.now(),
    reference: uuidv4(),
    userId: Id.makeId(),
    destinationWalletId: Id.makeId()
  }

  return {
    ...walletTransactions,
    ...overrides
  }
}
