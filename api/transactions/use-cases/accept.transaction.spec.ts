/* eslint-disable no-undef */
import { TransactionDb } from '../models/transaction.db'
import makeFakeTransaction from '../../test/fixtures/transaction'
import { makeFakeUser } from '../../test/fixtures/user'
import { setupDB } from '../../test/db'
import models from '../../database/models'
import { AcceptTransaction } from './accept.transaction'
import { UserDatabase } from '../../users/model/users.db'
import { createToken } from '../../helpers/jsonwt'
import { ITransactionDb } from '../transaction-interfaces/i.transaction'
import { IUserDb } from '../../users/user-interfaces/i.user'

const { Transaction, User, Escrow } = models

setupDB('transactions')

let transactionDb: ITransactionDb
let usersDb: IUserDb
beforeAll(() => {
  transactionDb = new TransactionDb(User, Transaction)
  usersDb = new UserDatabase(User)
})

function sendAcceptanceEmail() {
  console.log('Worked')
}
describe.skip('Accept Transaction', () => {
  it('throws when no current transaction is found', async () => {
    const newUser = makeFakeUser()
    const user = await usersDb.insert(newUser)
    const newtransaction = makeFakeTransaction({
      initiatorId: user.user._id
    })
    const transaction = await transactionDb.insert(newtransaction)
    const editedTransaction = { ...transaction, referenceId: 'kingisagoodboy' }
    const acceptTransaction = new AcceptTransaction(
      transactionDb,
      sendAcceptanceEmail
    )
    await expect(
      acceptTransaction.accept(editedTransaction)
    ).rejects.toThrowError('Transaction does not exist.')
  })

  it('marks transaction status as Transaction Accepted - Not funded', async () => {
    const newuser = makeFakeUser()
    const user = await usersDb.insert(newuser)
    const newtransaction = makeFakeTransaction({
      initiatorId: user.user._id
    })
    const transaction = await transactionDb.insert(newtransaction)
    const { referenceId } = transaction
    const acceptTransaction = new AcceptTransaction(
      transactionDb,
      sendAcceptanceEmail
    )
    const found = await acceptTransaction.accept({ referenceId })
    expect(found.status).toBe('Transaction Accepted - Not funded')
  })
})
