export default class OneOffTransaction {
  constructor(transactionDb) {
    this.transactionDb = transactionDb
  }

  addTransaction(transaction, userId, transactionSource) {
    return this.transactionDb.insert({
      firstName: transaction.getFirstName(),
      lastName: transaction.getLastName(),
      phoneNumber: transaction.getPhoneNumber(),
      email: transaction.getEmail(),
      title: transaction.getTitle(),
      description: transaction.getDesc(),
      currency: transaction.getCurrency(),
      chargeBearer: transaction.getCharge(),
      shippingFee: transaction.getShippingFee(),
      amount: transaction.getAmount(),
      inspectionPeriod: transaction.getInspectionPeriod(),
      dueDate: transaction.getDueDate(),
      reference: transaction.getRef(),
      initiator: userId,
      partyId: transaction.getPartyId(),
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },
      createdOn: transaction.getCreatedOn(),
      modifiedOn: transaction.getModifiedOn(),
      userId
    })
  }
}
