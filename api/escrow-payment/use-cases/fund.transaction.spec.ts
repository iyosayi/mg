import { EscrowDeposit } from './fund.transaction'
import { setupDB } from '../../test/db'
import { makeFakeEscrowDeposit } from '../../test/fixtures/escrow'
import makeFakeTransaction from '../../test/fixtures/transaction'
import { makeFakeUser } from '../../test/fixtures/user'
import { EscrowDatabase } from '../models/escrow.db'
import { IEscrowDb } from '../escrow-interfaces/i.escrow'
import models from '../../database/models'
import { ITransactionDb } from '../../transactions/transaction-interfaces/i.transaction'
import { TransactionDb } from '../../transactions/models/transaction.db'
import usersDb from '../../users/model'

const { User, Escrow, Transaction } = models

setupDB('escrow')

let escrowDb: IEscrowDb
let transactionDb: ITransactionDb

beforeAll(() => {
  escrowDb = new EscrowDatabase(Escrow, User, Transaction)
  transactionDb = new TransactionDb(User, Transaction)
})

describe('Escrow Deposit', () => {
  it('creates a deposit successfully', async () => {
    const fakeUser = makeFakeUser()
    const newUser = await usersDb.insert(fakeUser)
    const fakeTransaction = makeFakeTransaction({
      initiatorId: newUser.user._id,
      amount: 300000
    })
    const newTransaction = await transactionDb.insert(fakeTransaction)
    const { amount, initiatorId, referenceId } = newTransaction
    const fakeEscrow = makeFakeEscrowDeposit({
      amountPaid: amount,
      referenceId,
      userId: initiatorId
    })
    const escrowClass = new EscrowDeposit(transactionDb, escrowDb)
    const depositToMake = await escrowClass.makeDeposit({ ...fakeEscrow })
    expect(depositToMake.isTransactionFunded).toBe(true)
    expect(depositToMake.escrowCharge).not.toBe(0)
    expect(depositToMake.hasCustomerBeingPaid).toBe(false)
  })

  it('throws when no transaction is found', async () => {
    const fakeUser = makeFakeUser()
    const newUser = await usersDb.insert(fakeUser)
    const fakeTransaction = makeFakeTransaction({
      initiatorId: newUser.user._id
    })
    const newTransaction = await transactionDb.insert(fakeTransaction)
    const { amount, initiatorId } = newTransaction
    const fakeEscrow = makeFakeEscrowDeposit({
      amountPaid: amount,
      referenceId: 'jdddjh1992922101kdj',
      userId: initiatorId
    })
    const escrowClass = new EscrowDeposit(transactionDb, escrowDb)
    await expect(escrowClass.makeDeposit(fakeEscrow)).rejects.toThrowError(
      'Transaction does not exist.'
    )
  })
})
