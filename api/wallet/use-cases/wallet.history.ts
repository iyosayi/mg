import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { UserDatabase } from '../../users/model/users.db'
import { ID, IWalletDb } from '../wallet-interfaces/i.wallet'

/**
 * This is responsible for getting wallet history transactions
 * of a certain user.
 */

export class WalletHistory {
  constructor(private walletDb: IWalletDb, private usersDb: UserDatabase) {
    this.getWalletHistory = this.getWalletHistory.bind(this)
  }

  async getWalletHistory({ id }: { id: ID }) {
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const user = await this.usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }

    const wallet = await this.walletDb.findUserById({ id })
    if (!wallet) {
      throw new InvalidPropertyError('Wallet does not exist')
    }
    return wallet
  }
}
