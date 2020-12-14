import { WalletDatabase } from './wallet.db'
import models from '../../database/models'
import usersDb from '../../users/model'

const { Wallet, WalletTransaction } = models

const walletDb = new WalletDatabase(Wallet, usersDb, WalletTransaction)

export default walletDb
