/**
 * This sets the transaction status to 'Transaction Accepted - Not funded'
 * This is also when the seller/recipient accepts the transaction
 * which was initiated by the customer/buyer
 */

const makeAcceptTransaction = ({ transactionDb, sendAcceptanceEmail }) => {
  return async function acceptTransaction({ ref } = {}) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'Transaction Accepted - Not funded'
    const [updated] = await Promise.all([
      transactionDb.update({ id: _id, transactionStatus, accepted: true }),
      sendAcceptanceEmail({ _id, initiator })
    ])
    return updated
  }
}
export default makeAcceptTransaction
