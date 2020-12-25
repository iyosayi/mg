import { TransactionInProgress } from './transaction.in.progress'
import { setupDB } from '../../test/db'
import { TransactionDb } from '../models/transaction.db'
import { ITransactionDb } from '../transaction-interfaces/i.transaction'
import models from '../../database/models'
import { makeFakeUser } from '../../test/fixtures/user'
import usersDb from '../../users/model'
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeInProgressEmail from '../../mail/use-cases/mail.in.progress'
import { sendMail } from '../../test/fixtures/nodemailer'
import { dashboardURL } from '../../helpers/config'
import inProgressEmailTemplate from '../../mail/types/type.in.progress'

const { User, Transaction } = models

setupDB('transactions')
jest.setTimeout(40000)

let transactionDb: ITransactionDb
beforeAll(() => {
  transactionDb = new TransactionDb(User, Transaction)
})

describe('Transaction In Progress', () => {
  it('requires a reference id', async () => {
    const sendInProgressMail = makeInProgressEmail({
      transactionDb,
      usersDb,
      sendMail,
      dashboardURL,
      inProgressEmailTemplate
    })
    const inProgressClass = new TransactionInProgress(
      transactionDb,
      sendInProgressMail
    )
    await expect(
      inProgressClass.markInProgress({ referenceId: '' })
    ).rejects.toThrowError('Reference Id cannot be null or undefined.')
  })

  it('throws when no transaction is found', async () => {
    const sendInProgressMail = makeInProgressEmail({
      transactionDb,
      usersDb,
      sendMail,
      dashboardURL,
      inProgressEmailTemplate
    })
    const inProgressClass = new TransactionInProgress(
      transactionDb,
      sendInProgressMail
    )
    await expect(
      inProgressClass.markInProgress({ referenceId: 'kingisawesome' })
    ).rejects.toThrowError('Transaction does not exist.')
  })

  it('marks the transaction status to be In Progress', async () => {
    const transactionInitiator = makeFakeUser()
    const transactionRecipient = makeFakeUser()
    const insertedUser = await usersDb.insert(transactionInitiator)
    const insertedRecipient = await usersDb.insert(transactionRecipient)
    const transaction = makeFakeTransaction({
      initiatorId: insertedUser.user._id,
      userId: insertedUser.user._id,
      email: insertedRecipient.user.email
    })
    const sendInProgressMail = makeInProgressEmail({
      transactionDb,
      usersDb,
      sendMail,
      dashboardURL,
      inProgressEmailTemplate
    })
    const newTransaction = await transactionDb.insert(transaction)
    const { referenceId } = newTransaction
    const inProgressClass = new TransactionInProgress(
      transactionDb,
      sendInProgressMail
    )
    const result = await inProgressClass.markInProgress({ referenceId })
    expect(result?.status).toBe('In Progress')
  })
})
