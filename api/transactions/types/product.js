import OneOffTransaction from './one.off'

export default class ProductTransaction extends OneOffTransaction {
  constructor() {
    super()
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
      inspectionPeriod: transaction.getInspectionPeriod(),
      dueDate: transaction.getDueDate(),
      reference: transaction.getRef(),
      initiator: userId,
      partyId: transaction.getPartyId(),
      type: transaction.getType(),
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },
      products: {
        productTitle: transaction.getProductTitle(),
        amount: transaction.getAmount(),
        quantity: transaction.getQuantity()
      },
      createdOn: transaction.getCreatedOn(),
      modifiedOn: transaction.getModifiedOn(),
      userId
    })
  }
}
