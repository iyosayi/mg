/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import requiredParam from '../../helpers/requireParam'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors'

export default function buildMakeWalletFactory({ uuidv4 }) {
  return function makeWallet({
    totalAmount = requiredParam('Amount'),
    operationType = requiredParam('Type'),
    destinationWalletId,
    createdAt = Date.now()
  } = {}) {
    if (!totalAmount || totalAmount <= 0) {
      throw new InvalidPropertyError('Amount must be greater than zero.')
    }

    if (typeof totalAmount === 'string') {
      totalAmount = parseFloat(totalAmount)
    }

    if (!operationType) {
      throw new RequiredParameterError('Operation type e.g deposit or withdraw')
    }

    let reference
    function makeRef() {
      return uuidv4()
    }

    return Object.freeze({
      getAmount: () => totalAmount,
      getRef: () => reference || (reference = makeRef()),
      getOperation: () => operationType,
      getCreatedAt: () => createdAt,
      getDestinationAccount: () => destinationWalletId
    })
  }
}
