import { WalletWithdrawal } from './wallet.withdraw'
import { setupDB } from '../../test/db'
import { makeFakeDeposit, makeFakeWithdrawal } from '../../test/fixtures/wallet'
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
    // insert users into database
    const withdrawInitiator = await usersDb.insert(user)

    // create wallet
    const withdrawInitiatorWallet = await walletDb.create({
      userId: withdrawInitiator.user._id,
      userEmail: withdrawInitiator.user.email
    })

    const userBalance = (withdrawInitiator.user.balance += 2000)
    const amountToWithdraw = userBalance - 1000

    // deposit money into the transferer account
    const depositedAmount = makeFakeDeposit({
      userId: withdrawInitiator.user._id,
      amount: 2000
    })

    const userDeposit = await walletDb.deposit({ ...depositedAmount })
    // const toWithdraw = makeFakeWithdrawal({
    //   userId: withdrawInitiator.user._id,
    //   destinationWalletId: transferRecipient.user.walletId,
    //   amount: amountToTransfer
    // })

    // const toWithdraw = new WalletWithdrawal(walletDb)
    // const ttt = await toWithdraw.makeWalletWithdrawal({ ...toWithraw })
    // console.log({ ttt })
    // expect(userDeposit.amount).toBe(2000)
    // // expect(transferRecipientWallet.balance).toBe(1000)
    // expect(transferInitiatortWallet.balance).toBe(1000)
  })
})
