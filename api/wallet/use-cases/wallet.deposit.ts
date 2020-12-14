import makeWallet from '../factory'
import { Deposit, IWalletDb } from '../wallet-interfaces/i.wallet'
import { RequiredParameterError } from '../../helpers/Errors'

/**
 * This is responsible for handling the deposit of money into an individual's wallet
 */

export class WalletDeposit {
  constructor(private walletDb: IWalletDb) {
    this.walletDeposit = this.walletDeposit.bind(this)
  }

  async walletDeposit({ ...walletDetails }: Deposit) {
    const { userId } = walletDetails
    if (!userId) {
      throw new RequiredParameterError('Id')
    }

    const newDeposit = makeWallet(walletDetails)
    return this.walletDb.deposit({
      amount: newDeposit.getAmount(),
      operationType: newDeposit.getOperation(),
      createdAt: newDeposit.getCreatedAt(),
      reference: newDeposit.getRef(),
      userId
    })
  }
}
