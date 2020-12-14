import { WalletDeposit } from './wallet.deposit'
import { makeCreateWallet } from './index'
import { setupDB } from '../../test/db'
import { makeFakeDeposit } from '../../test/fixtures/wallet'
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

describe('Deposit money into wallet', () => {
  it('deposit money into a user wallet successfully', async () => {
    const user = makeFakeUser()
    const inserted = await usersDb.insert(user)
    const { _id } = inserted.user
    const walletDetails = makeFakeDeposit({ userId: _id, amount: 100000 })
    const walletDeposit = new WalletDeposit(walletDb)
    await makeCreateWallet.createWallet({ id: _id })
    const deposited = await walletDeposit.walletDeposit({ ...walletDetails })
    expect(deposited.amount).toBe(100000)
    expect(deposited.operationType).toBe('deposit')
  })
})
