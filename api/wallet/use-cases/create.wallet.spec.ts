import { CreateWallet } from './create.wallet'
import { setupDB } from '../../test/db'
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

describe('Create Wallet', () => {
  it('creates a wallet successfully', async () => {
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const { _id } = newUser.user
    const initWallet = new CreateWallet(walletDb, usersDb)
    const createdWallet = await initWallet.createWallet({ id: _id })
    expect(createdWallet.balance).toBe(0)
    expect(createdWallet.userId).toEqual(_id)
    expect(createdWallet.userEmail).toBeDefined()
  })
})
