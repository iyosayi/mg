/* eslint-disable no-undef */
import makeTransactionsDb from '../models/transactionDb'
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeFakeUser from '../../test/fixtures/user'
import setupDB from '../../test/db'
import models from '../../database/models'
import makeAcceptTransaction from './acceptTransaction'
import makeUsersDb from '../../users/model/usersDb'
import { createToken } from '../../helpers/jsonwt'

const { Transaction, User, Escrow } = models

setupDB('transactions')

let transactionDb
let usersDb
beforeAll(() => {
  transactionDb = makeTransactionsDb({ Transaction, User, Escrow })
  usersDb = makeUsersDb({ User, createToken })
})

describe('Accept Transaction', () => {
  it('marks transaction status as Transaction Accepted - Not funded', async () => {
    const newuser = makeFakeUser()
    const user = await usersDb.insert(newuser)
    const newtransaction = makeFakeTransaction({
      user: { id: user?.user?._id }
    })
    const transaction = await transactionDb.insert(newtransaction)
    const acceptTransaction = makeAcceptTransaction({
      transactionDb,
      sendAcceptanceEmail: () => {}
    })
    const found = await acceptTransaction({ ref: transaction.reference })
    expect(found.transactionStatus).toBe('Transaction Accepted - Not funded')
  })
})
