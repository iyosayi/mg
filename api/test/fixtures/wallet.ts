import { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import faker from 'faker'

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
