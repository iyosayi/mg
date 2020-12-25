import { ID, ITransactionDb } from '../transaction-interfaces/i.transaction'

export default class OneOffTransaction {
  constructor(private transactionDb: ITransactionDb) {}

  addTransaction(
    transaction: any,
    userId: string | ID,
    transactionSource: any
  ) {
    return this.transactionDb.insert({
      phoneNumber: transaction.getPhoneNumber(),
      email: transaction.getEmail(),
      title: transaction.getTitle(),
      description: transaction.getDesc(),
      currency: transaction.getCurrency(),
      chargeBearer: transaction.getCharge(),
      type: transaction.getType(),
      // shippingFee: transaction.getShippingFee(),
      amount: transaction.getAmount(),
      // inspectionPeriod: transaction.getInspectionPeriod(),
      dueDate: transaction.getDueDate(),
      referenceId: transaction.getRef(),
      initiatorId: userId,
      partyId: transaction.getPartyId(),
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },

      // @ts-ignore
      userId
    })
  }
}
