// import { sendNotificationEmail } from '../../mail'
import makeEscrow from '../factory'
import { IEscrowDb, ID, IEscrowResult } from '../escrow-interfaces/i.escrow'
import { InvalidPropertyError } from '../../helpers/Errors'

/**
 * Saves the payment information for a certain transaction to the
 * escrow database.
 */

interface IFundDetails {
  amountPaid: number
  referenceId: string
  userId: string | ID
}

export class EscrowDeposit {
  constructor(private transactionDb: any, private escrowDb: IEscrowDb) {
    this.makeDeposit = this.makeDeposit.bind(this)
  }

  async makeDeposit({
    ...userPaymentDetails
  }: IFundDetails): Promise<IEscrowResult> {
    const { amountPaid, referenceId, userId } = userPaymentDetails
    const actualTransaction = await this.transactionDb.findByRef({
      referenceId
    })

    if (!actualTransaction) {
      throw new InvalidPropertyError('Transaction does not exist.')
    }
    const depositedFund = makeEscrow({
      amountPaid,
      referenceId,
      buyerId: userId
    })

    const payment = {
      amountPaid: depositedFund.getAmount(),
      referenceId: depositedFund.getReference(),
      buyerId: depositedFund.getBuyerId(),
      escrowCharge: depositedFund.getEscrowCharge(),
      transactionId: actualTransaction._id,
      isTransactionFunded: true
    }

    const [deposit, updated] = await Promise.all([
      this.escrowDb.deposit(payment),
      this.transactionDb.update({
        id: actualTransaction._id,
        status: 'Accepted and Funded',
        tag: 'bft',
        isTransactionFunded: true
      })
      // sendNotificationEmail({ ref: reference, userId })
    ])
    return deposit
  }
}
