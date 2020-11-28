/**
 * This is responsible for when a customer/buyer rejects the delivered
 * order/product. This sets the transaction status to 'Transaction Delivery Rejected'
 */
const makeRejectDeliveredTransaction = ({
  transactionDb,
  usersDb,
  sendDeliveryRejectionEmail
}) => {
  return async function rejectDeliveredTransaction({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    const user = await usersDb.findById({ id: initiator })
    transactionStatus = 'Transaction Delivery Rejected'
    await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendDeliveryRejectionEmail({ ref, user })
    ])
  }
}

export default makeRejectDeliveredTransaction
