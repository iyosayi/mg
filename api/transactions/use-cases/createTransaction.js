import makeTransaction from '../factory'
import OneOffTransaction from '../types/one.off'
import ProductTransaction from '../types/product'

const product = new ProductTransaction()

const makeBuildCreateTransaction = ({ transactionDb, sendTransactionMail }) => {
  return async function createTransaction({ userId, ...transactionInfo } = {}) {
    const transaction = makeTransaction({ ...transactionInfo })
    const oneOff = new OneOffTransaction(transactionDb)
    const transactionSource = transaction.getSource()
    const type = transaction.getType()
    const newTransaction = transactionType(type)
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
