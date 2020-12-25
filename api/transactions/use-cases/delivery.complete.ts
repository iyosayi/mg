/**
 * Sets transaction status to 'Delivered'
 * This is when the order/product gets delivered by the carrier/logistics company
 * this also notifies the buyer/customer that the product has arrived the set destination
 */

import { InvalidPropertyError } from '../../helpers/Errors'
import { ITransactionDb } from '../transaction-interfaces/i.transaction'

export class DeliveryComplete {
  constructor(
    private transactionDb: ITransactionDb,
    private sendDeliveryEmail: Function
  ) {
    this.deliver = this.deliver.bind(this)
  }

  async deliver({ referenceId }: { referenceId: string }) {
    const currentTransaction = await this.transactionDb.findByRef({
      referenceId
    })
    if (!currentTransaction) {
      throw new InvalidPropertyError('Transaction does not exist.')
    }
    // _id is the transaction Id
    let { status, _id, initiatorId } = currentTransaction
    status = 'Delivered'
    const [updated] = await Promise.all([
      // @ts-ignore
      this.transactionDb.update({
        id: _id,
        status
      }),
      this.sendDeliveryEmail({ referenceId, initiatorId })
    ])
    return updated
  }
}
