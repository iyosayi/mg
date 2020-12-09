import { InvalidPropertyError, RequiredParameterError } from '../../helpers/Errors'
import requiredParam from '../../helpers/requireParam'
import {ID} from '../models/walletModel'

/**
 * This is responsible for creating the wallet details of a user
 * during sign up.
 */
export default function createNewWallet({
  walletDb,
  usersDb
}) {
  return async function createWallet(id: ID) {
    if(!id) {
      throw new RequiredParameterError('Id')
    }
    const found = await usersDb.findById({ id })
    if (!found) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { _id, email } = found

    return walletDb.create({
      userId: _id,
      userEmail: email
    })
  }
}
