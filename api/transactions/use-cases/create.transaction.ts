import makeTransaction from '../factory'
import {
  ID,
  ITransaction,
  ITransactionDb,
  ITransactionResult
} from '../transaction-interfaces/i.transaction'
import OneOffTransaction from '../types/one.off'

/**
 * This is responsible for the buyer/initiator of a transaction
 * to successfully create a transaction depending on the kind of
 * transaction.
 */

type TransactionMail = {
  newTransaction: ITransactionResult
  userId: string
}

export class CreateTransaction {
  constructor(
    private transactionDb: ITransactionDb,
    private sendTransactionMail: ({
      newTransaction,
      userId
    }: TransactionMail) => Promise<void>
  ) {}

  async create({
    userId,
    ...transactionInfo
  }: { userId: string } & ITransaction) {
    const transaction = makeTransaction({ ...transactionInfo })
    const oneOff = new OneOffTransaction(this.transactionDb)
    const transactionSource = transaction.getSource()
    const type = transaction.getType()
    const newTransaction = (await transactionType(type)) as ITransactionResult
    await this.sendTransactionMail({ newTransaction, userId })
    return newTransaction

    function transactionType(types: string) {
      switch (types) {
        case 'one-off':
          return oneOff.addTransaction(transaction, userId, transactionSource)
        default:
          break
      }
    }
  }
}
