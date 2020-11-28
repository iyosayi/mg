/**
 * Sets the transaction status to 'in progress'
 * and notifies the customer/buyer that the order/product is in transit
 * or being delivered.
 */
const makeInProgress = ({ transactionDb, sendInProgressEmail }) => {
  return async function inProgress({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'In Progress'
    await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendInProgressEmail({ ref, initiator })
    ])
  }
}

export default makeInProgress
