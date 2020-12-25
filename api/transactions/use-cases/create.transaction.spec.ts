import { CreateTransaction } from './create.transaction'
import { TransactionDb } from '../models/transaction.db'
import { Transaction } from '../models/transaction.model'
import makeFakeTransaction from '../../test/fixtures/transaction'
import { makeFakeUser } from '../../test/fixtures/user'
import { ITransactionDb } from '../transaction-interfaces/i.transaction'
import { User } from '../../users/model/user.model'
import usersDb from '../../users/model'
import { setupDB } from '../../test/db'
import buildMakeSendTransaction from '../../mail/use-cases/mail.create.transaction'
import { sendMail } from '../../test/fixtures/nodemailer'
import { createTransactionTemplate } from '../../mail/types/type.create.transaction'
import { dashboardURL } from '../../helpers/config'

setupDB('transactions')

jest.setTimeout(40000)
let transactionDb: ITransactionDb
beforeAll(() => {
  transactionDb = new TransactionDb(User, Transaction)
})

describe('Create Transaction', () => {
  it('adds a transaction to the db', async () => {
    const user = makeFakeUser()
    const insertedUser = await usersDb.insert(user)
    const userId = insertedUser.user._id.toString()
    const transaction = makeFakeTransaction({
      initiatorId: insertedUser.user._id,
      userId
    })
    const sendTransactionMail = buildMakeSendTransaction({
      transactionDb,
      usersDb,
      sendMail,
      dashboardURL,
      createTransactionTemplate
    })
    const createdTransaction = new CreateTransaction(
      transactionDb,
      sendTransactionMail
    )
    const newTransaction = await createdTransaction.create(transaction)
    expect(newTransaction?._id).toBeDefined()
    expect(newTransaction?.initiatorId).toEqual(insertedUser.user._id)
    expect(newTransaction?.status).toBe('Awaiting Confirmation')
  })
})
