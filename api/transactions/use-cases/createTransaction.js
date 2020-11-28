import makeTransaction from '../factory'
import OneOffTransaction from '../types/one.off'
import ProductTransaction from '../types/product'

/**
 * This is responsible for the buyer/initiator of a transaction
 * to successfully create a transaction depending on the kind of
 * transaction.
 *
 * 1) One-off
 * 2) Product
 */
const makeBuildCreateTransaction = ({ transactionDb, sendTransactionMail }) => {
  return async function createTransaction({ userId, ...transactionInfo } = {}) {
    const transaction = makeTransaction({ ...transactionInfo })
    const oneOff = new OneOffTransaction(transactionDb)
    const product = new ProductTransaction(transactionDb)
    const transactionSource = transaction.getSource()
    const type = transaction.getType()
    const newTransaction = await transactionType(type)
    await sendTransactionMail({ newTransaction, userId })
    return newTransaction

    function transactionType(types) {
      switch (types) {
        case 'product':
          return product.addTransaction(transaction, userId, transactionSource)

        case 'one-off':
          return oneOff.addTransaction(transaction, userId, transactionSource)
        default:
          break
      }
    }
  }
}

export default makeBuildCreateTransaction
