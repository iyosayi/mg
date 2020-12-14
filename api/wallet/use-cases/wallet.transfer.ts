import { InvalidPropertyError } from '../../helpers/Errors'
import makeWallet from '../factory'
import {
  IWalletDb,
  ID,
  IWalletTransactions
} from '../wallet-interfaces/i.wallet'
import { UserDatabase } from '../../users/model/users.db'

/**
 * This is responsible for handling the transfer of money from one wallet
 * to another.
 */

export class WalletTransfer {
  constructor(private walletDb: IWalletDb, private usersDb: UserDatabase) {
    this.makeWalletTransfer = this.makeWalletTransfer.bind(this)
  }

  async makeWalletTransfer({ ...walletDetails }: IWalletTransactions) {
    const { userId } = walletDetails // user making the transfer
    const transferFactory = makeWallet(walletDetails)
    const transferInitiator = await this.usersDb.findById({ id: userId })
    if (!transferInitiator) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { walletId } = transferInitiator
    const sender = await this.walletDb.findByAccountId({ id: walletId })
    if (!sender) {
      throw new InvalidPropertyError('Account does not exist.')
    }
    const { balance } = sender
    if (balance < walletDetails.amount || balance <= 0) {
      throw new InvalidPropertyError(
        'Insufficient funds to perform this operation.'
      )
    }
    const { destinationWalletId } = walletDetails
    const recipientAccount = await this.walletDb.findByAccountId({ // user recieving the transfered money
      id: destinationWalletId as ID
    })
    if (!recipientAccount) {
      throw new InvalidPropertyError('Account does not exist.')
    }

    return this.walletDb.transfer({
      destinationWalletId: transferFactory.getDestinationAccount(),
      amount: transferFactory.getAmount(),
      operationType: transferFactory.getOperation(),
      reference: transferFactory.getRef(),
      createdAt: transferFactory.getCreatedAt(),
      userId
    })
  }
}
