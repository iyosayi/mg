/* eslint-disable import/prefer-default-export */
import { CreateWallet } from './create.wallet'
import { WalletDeposit } from './wallet.deposit'
import { WalletTransfer } from './wallet.transfer'
import { WalletWithdrawal } from './wallet.withdraw'
import { WalletHistory } from './wallet.history'
import walletDb from '../models'
import usersDb from '../../users/model'

const makeCreateWallet = new CreateWallet(walletDb, usersDb)
const makeWalletDeposit = new WalletDeposit(walletDb)
const makeWalletTransfer = new WalletTransfer(walletDb, usersDb)
const makeWalletWithdraw = new WalletWithdrawal(walletDb)
const makeWalletHistory = new WalletHistory(walletDb, usersDb)

export {
  makeCreateWallet,
  makeWalletDeposit,
  makeWalletTransfer,
  makeWalletWithdraw,
  makeWalletHistory
}
