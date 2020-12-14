import { InvalidPropertyError } from '../../helpers/Errors'
import makeWallet from '../factory'
import { IWalletDb, IWalletTransactions } from '../wallet-interfaces/i.wallet'

/**
 * This is responsible for withdrawing money from a user account.
 */

export class WalletWithdrawal {
  constructor(private walletDb: IWalletDb) {
    this.makeWalletWithdrawal = this.makeWalletWithdrawal.bind(this)
  }

  async makeWalletWithdrawal({...walletDetails}: IWalletTransactions) {
    const toWithdraw = makeWallet(walletDetails)
    const {userId, walletId} = walletDetails
    const foundUserAccount = await this.walletDb.findByAccountId({
      id: walletId
    })
    if (!foundUserAccount) {
      throw new InvalidPropertyError('Account does not exist')
    }
    const { balance } = foundUserAccount
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
      userId
    })
  }
}
