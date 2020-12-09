import { InvalidPropertyError } from '../../helpers/errors'

/**
 * This is responsible for getting wallet history transactions
 * of a certain user.
 */
const makeWalletHistory = ({ walletDb, usersDb }) => {
  return async function walletHistory({ id }) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }

    const wallet = await walletDb.findUserById({ id })
    if (!wallet) {
      throw new InvalidPropertyError('Wallet does not exist')
    }

    return wallet
  }
}

export default makeWalletHistory
