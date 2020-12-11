/**
 * Sets transaction status to 'Delivered'
 * This is when the order/product gets delivered by the carrier/logistics company
 * this also notifies the buyer/customer that the product has arrived the set destination
 */
const makeDeliveryComplete = ({ transactionDb, sendDeliveryEmail }) => {
  return async function deliveryComplete({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { status, _id, initiator } = currentTransaction
    status = 'Delivered'
    const [updated] = await Promise.all([
      transactionDb.update({
        id: _id,
        status,
        tag: 'bco'
      }),
      sendDeliveryEmail({ ref, initiator })
    ])
    return updated
  }
}

export default makeDeliveryComplete
