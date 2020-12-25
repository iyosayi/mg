/**
 * This sets the transaction status to 'Transaction Accepted - Not funded'
 * This is also when the seller/recipient accepts the transaction
 * which was initiated by the customer/buyer
 */

import { InvalidPropertyError } from '../../helpers/Errors'
import {
  ITransactionDb,
  ITransactionResult
} from '../transaction-interfaces/i.transaction'

export class AcceptTransaction {
  constructor(
    private transactionDb: ITransactionDb,
    private sendAcceptanceEmail: Function
  ) {
    this.accept = this.accept.bind(this)
  }

  async accept({
    referenceId
  }: {
    referenceId: string
  }): Promise<ITransactionResult> {
    const currentTransaction = await this.transactionDb.findByRef({
      referenceId
    })
    if (!currentTransaction) {
      throw new InvalidPropertyError('Transaction does not exist.')
    }

    let { status, _id, initiatorId } = currentTransaction
    status = 'Transaction Accepted - Not funded'

    const [updated] = await Promise.all([
      // @ts-ignore
      this.transactionDb.update({ id: _id, status, accepted: true }),
      this.sendAcceptanceEmail({ transactionId: _id, initiatorId })
    ])
    if (!updated) {
      throw new InvalidPropertyError('Transaction update failed.')
    }
    return updated
  }
}
