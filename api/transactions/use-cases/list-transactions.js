import { InvalidPropertyError } from '../../helpers/errors'
import getCache from '../../cache/use-cases/getCache'
import setCache from '../../cache/use-cases/setCache'
/**
 * Get all transctions of a user
 */

const makeListTransactions = ({ usersDb, transactionDb }) => {
  return async function listTransactions({ id } = {}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { email } = user
    
    //Get cached transactions
    const cachedTransactions = await getCache({ email });
    if (cachedTransactions) {
      return cachedTransactions
    } else {
      const found = await transactionDb.findMyTransactions(email);
      // Set cached transactions
      const setTransactions = await setCache({ email: email, transactions: found.transactions })
      return found.transactions
    }
   
  }
}

export default makeListTransactions
