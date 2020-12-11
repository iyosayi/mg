import { sendNotificationEmail } from '../../mail'
import { makeEscrow } from '../../core-payment/factory'

/**
 * Saves the payment information for a certain transaction to the
 * escrow database.
 */
const makeDepositEscrow = ({ transactionDb, escrowDb, walletDb }) => {
  return async ({ user, ...details }) => {
    const { totalAmount, reference } = details
    try {
      const ref = reference
      const buyerId = user.id
      const found = await transactionDb.findByRef({ ref })
      const depositedFund = makeEscrow({
        totalAmount,
        reference,
        buyerId 
      })
      const payment = {
        totalAmount: depositedFund.getAmount(),
        reference: depositedFund.getReference(),
        buyerId: depositedFund.getBuyerId(),
        escrowCharge: depositedFund.getEscrowCharge(),
        transactionId: found._id,
        isDepositSuccessful: true
      }

      const [deposit, updated] = await Promise.all([
        escrowDb.deposit(payment),
        walletDb.deposit({
          totalAmount: depositedFund.getAmount(),
          operationType: 'deposit',
          createdAt: Date.now(),
          reference,
          userId: buyerId
        }),
        transactionDb.update({
          id: found._id,
          status: 'Accepted and Funded',
          tag: 'bft'
        }),
        sendNotificationEmail({ ref, user })
      ])
      return [deposit, updated]
    } catch (error) {
      console.error(error)
    }
  }
}

export default makeDepositEscrow
