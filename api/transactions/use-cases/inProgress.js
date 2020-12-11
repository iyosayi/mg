/**
 * Sets the transaction status to 'in progress'
 * and notifies the customer/buyer that the order/product is in transit
 * or being delivered.
 */
const makeInProgress = ({ transactionDb, sendInProgressEmail }) => {
  return async function inProgress({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { status, _id, initiator } = currentTransaction
    status = 'In Progress'
    await Promise.all([
      transactionDb.update({ id: _id, status }),
      sendInProgressEmail({ ref, initiator })
    ])
  }
}

export default makeInProgress
