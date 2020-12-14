import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'
import { ID, IWalletDb } from '../wallet-interfaces/i.wallet'

/**
 * This is responsible for creating the wallet details of a user
 * during sign up.
 */

export class CreateWallet {
  constructor(private walletDb: IWalletDb, private usersDb: IUserDb) {
    this.createWallet = this.createWallet.bind(this)
  }
  async createWallet({ id }: { id: ID }) {
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const found = await this.usersDb.findById({ id })
    if (!found) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { _id, email } = found

    return this.walletDb.create({
      userId: _id,
      userEmail: email
    })
  }
}

// export default function createNewWallet({
//   walletDb,
//   usersDb
// }: {
//   walletDb: IWalletDb
//   usersDb: IUserDb
// }) {
//   return async function createWallet(id: ID) {
//     if (!id) {
//       throw new RequiredParameterError('Id')
//     }
//     const found = await usersDb.findById({ id })
//     if (!found) {
//       throw new InvalidPropertyError('User does not exist.')
//     }
//     const { _id, email } = found

//     return walletDb.create({
//       userId: _id,
//       userEmail: email
//     })
//   }
// }
