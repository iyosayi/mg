import { WalletTransfer } from './wallet.transfer'
import { makeCreateWallet } from './index'
import { setupDB } from '../../test/db'
import { makeFakeDeposit, makeFakeTransfer } from '../../test/fixtures/wallet'
import { makeFakeUser } from '../../test/fixtures/user'
import models from '../../database/models'
import { WalletDatabase } from '../models/wallet.db'
import usersDb from '../../users/model'
import { IWalletDb } from '../wallet-interfaces/i.wallet'

const { Wallet, WalletTransaction } = models
setupDB('wallet')

let walletDb: IWalletDb
beforeAll(() => {
  walletDb = new WalletDatabase(Wallet, usersDb, WalletTransaction)
})

/**
 * To transfer, I have to do the following
 * 1) Have two users
 * 2) The users must be in the database
 * 3) The users must have a wallet
 * 4) The transferer must have money in his/her account
 */

describe.skip('Wallet Transfer', () => {
  it('transfers money successfully', async () => {
    const user = makeFakeUser()
    const user2 = makeFakeUser()

    // insert users into database
    const transferInitiator = await usersDb.insert(user)
    const transferRecipient = await usersDb.insert(user2)

    // create wallet for both users
    const transferInitiatortWallet = await walletDb.create({
      userId: transferInitiator.user._id,
      userEmail: transferInitiator.user.email
    })
    const transferRecipientWallet = await walletDb.create({
      userId: transferRecipient.user._id,
      userEmail: transferRecipient.user.email
    })

    transferInitiator.user.walletId = transferInitiatortWallet._id
    transferRecipient.user.walletId = transferRecipientWallet._id

    const userOneBalance = (transferInitiator.user.balance += 2000)
    const amountToTransfer = userOneBalance - 1000

    // deposit money into the transferer account
    const depositedAmount = makeFakeDeposit({
      userId: transferInitiator.user._id,
      amount: 2000
    })

    const userDeposit = await walletDb.deposit({ ...depositedAmount })
    console.log({ userDeposit })
    const toTransfer = makeFakeTransfer({
      userId: transferInitiator.user._id,
      destinationWalletId: transferRecipient.user.walletId,
      amount: amountToTransfer
    })

    const transfer = new WalletTransfer(walletDb, usersDb)
    const ttt = await transfer.makeWalletTransfer({ ...toTransfer })
    console.log({ ttt })
    expect(userDeposit.amount).toBe(2000)
    // expect(transferRecipientWallet.balance).toBe(1000)
    expect(transferInitiatortWallet.balance).toBe(1000)
  })
})
