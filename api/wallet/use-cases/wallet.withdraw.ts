import { InvalidPropertyError } from '../../helpers/Errors'
import {  IUserResult } from '../../users/user-interfaces/i.user'
import makeWallet from '../factory'
import { IWalletDb, IWalletTransactions } from '../wallet-interfaces/i.wallet'

/**
 * This is responsible for withdrawing money from a user account.
 */

export class WalletWithdrawal {
  constructor(private walletDb: IWalletDb) {
    this.makeWalletWithdrawal = this.makeWalletWithdrawal.bind(this)
  }

  async makeWalletWithdrawal({user, walletDetails}: {user: IUserResult, walletDetails: IWalletTransactions}) {
    const toWithdraw = makeWallet(walletDetails)
    const { _id, walletId } = user
    const accountOwner = await this.walletDb.findByAccountId({ id: walletId })
    if(!accountOwner) {
      throw new InvalidPropertyError('Account does not exist')
    }
    const { balance } = accountOwner
    // checks to see if the requested amount is greater than the user's balance
    if (walletDetails.amount > balance) {
      throw new InvalidPropertyError('Insufficient funds.')
    }

    // send mail here
    return this.walletDb.withdraw({
      amount: toWithdraw.getAmount(),
      reference: toWithdraw.getRef(),
      createdAt: toWithdraw.getCreatedAt(),
      operationType: toWithdraw.getOperation(),
      userId: _id
    })
  }
} 


// export default function makeWalletWithdrawal({ walletDb }) {
//   return async function walletWithdrawal({ user, ...walletDetails }) {
//     const withdrawal = makeWallet(walletDetails)
//     const { _id, walletId } = user
//     const accountOwner = await walletDb.findByAccountId({ id: walletId })
//     const { balance } = accountOwner
//     // checks to see if the requested amount is greater than the user's balance
//     if (walletDetails.amount > balance) {
//       throw new InvalidPropertyError('Insufficient funds.')
//     }

//     // send mail here
//     return walletDb.withdraw({
//       amount: withdrawal.getAmount(),
//       reference: withdrawal.getRef(),
//       createdAt: withdrawal.getCreatedAt(),
//       operationType: withdrawal.getOperation(),
//       userId: _id
//     })
//   }
// }
