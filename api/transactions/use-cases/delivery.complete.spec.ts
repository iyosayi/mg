import { TransactionDb } from '../models/transaction.db'
import { makeFakeUser } from '../../test/fixtures/user'
import makeFakeTransaction from '../../test/fixtures/transaction'
import { setupDB } from '../../test/db'
import models from '../../database/models'
import { UserDatabase } from '../../users/model/users.db'
import { DeliveryComplete } from './delivery.complete'
import { ITransactionDb } from '../transaction-interfaces/i.transaction'
import { IUserDb } from '../../users/user-interfaces/i.user'
import { sendMail } from '../../test/fixtures/nodemailer'
import makeDeliveryEmail from '../../mail/use-cases/send.delivery.mail'
import dashboardURL from '../../mail/use-cases/dashboard'
import deliveryEmailTemplate from '../../mail/types/delivery.template'

const { Transaction, User } = models

setupDB('transactions')

jest.setTimeout(40000)

let transactionDb: ITransactionDb
let usersDb: IUserDb

beforeAll(() => {
  usersDb = new UserDatabase(User)
  transactionDb = new TransactionDb(User, Transaction)
})

describe('Deliver Status', () => {
  it('throws when no transaction is found', async () => {
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const transaction = makeFakeTransaction({ initiatorId: newUser.user._id })
    const insertedTransaction = await transactionDb.insert(transaction)
    const sendDeliveryEmail = makeDeliveryEmail({
      transactionDb,
      sendMail,
      usersDb,
      dashboardURL,
      deliveryEmailTemplate
    })
    const editedTransaction = {
      ...insertedTransaction,
      referenceId: 'kingisagoodd'
    }
    const deliverTransaction = new DeliveryComplete(
      transactionDb,
      sendDeliveryEmail
    )
    await expect(
      deliverTransaction.deliver(editedTransaction)
    ).rejects.toThrowError('Transaction does not exist.')
  })

  it('marks an order as deliverd', async () => {
    const user = makeFakeUser({ email: 'iyosa14@gmail.com' }) // initiator
    const userTwo = makeFakeUser({ email: 'kingetiosasere@gmail.com' }) // recipient
    const newUser = await usersDb.insert(user)
    const secondUser = await usersDb.insert(userTwo)
    const transaction = makeFakeTransaction({
      initiatorId: newUser.user._id,
      email: secondUser.user.email
    })
    const insertedTransaction = await transactionDb.insert(transaction)
    const sendDeliveryEmail = makeDeliveryEmail({
      transactionDb,
      sendMail,
      usersDb,
      dashboardURL,
      deliveryEmailTemplate
    })
    const deliverTransaction = new DeliveryComplete(
      transactionDb,
      sendDeliveryEmail
    )
    const result = await deliverTransaction.deliver(insertedTransaction)
    expect(result?.status).toBe('Delivered')
  })
})
