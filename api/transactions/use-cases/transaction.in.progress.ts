import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { ID, ITransactionDb } from '../transaction-interfaces/i.transaction'

type ProgressInput = {
  referenceId: string
  initiatorId: string | ID
}

/**
 * Sets the transaction status to 'in progress'
 * and notifies the customer/buyer that the order/product is in transit
 * or being delivered.
 */
export class TransactionInProgress {
  constructor(
    private transactionDb: ITransactionDb,
    private sendInProgressEmail: ({
      referenceId,
      initiatorId 
    }: ProgressInput) => Promise<void>
  ) {}
  async markInProgress({ referenceId }: { referenceId: string }) {
    if (!referenceId) {
      throw new RequiredParameterError('Reference Id')
    }
    const currentTransaction = await this.transactionDb.findByRef({
      referenceId
    })
    if (!currentTransaction) {
      throw new InvalidPropertyError('Transaction does not exist.')
    }
    let { status, _id, initiatorId } = currentTransaction
    status = 'In Progress'
    const [updated] = await Promise.all([
      //@ts-ignore
      this.transactionDb.update({ id: _id, status }),
      this.sendInProgressEmail({ referenceId, initiatorId })
    ])
    return updated
  }
}
