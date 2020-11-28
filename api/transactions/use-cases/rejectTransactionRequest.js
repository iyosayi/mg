/**
 * This is responsible for when the transaction is rejected by the recipient
 * due to transaction agreement not fully met. The transaction status is set
 * to 'Tranasction Request Rejected'
 */

const makeRejectTransactionRequest = ({
  transactionDb,
  sendRejectionMail,
  usersDb
}) => {
  return async function rejectTransaction({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    const user = await usersDb.findById({ id: initiator })
    transactionStatus = 'Transaction Request Rejected'
    const [transaction] = await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendRejectionMail({ ref, user })
    ])
    return transaction.transactionStatus
  }
}

export default makeRejectTransactionRequest
