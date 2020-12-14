/* eslint-disable no-return-assign */
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { Wallet } from '../wallet-interfaces/i.wallet'

export default function buildMakeWalletFactory({ uuidv4 }: any) {
  return function makeWallet(values: Wallet) {
    let {
      amount,
      operationType,
      destinationWalletId,
      createdAt,
      reference
    } = values
    if (!amount || amount <= 0) {
      throw new InvalidPropertyError('Amount must be greater than zero.')
    }

    if (typeof amount !== 'number') {
      amount = parseFloat(amount)
    }

    if (!operationType) {
      throw new RequiredParameterError('Operation type e.g deposit or withdraw')
    }
    function makeRef() {
      return uuidv4()
    }

    return Object.freeze({
      getAmount: () => amount,
      getRef: () => reference || (reference = makeRef()),
      getOperation: () => operationType,
      getCreatedAt: () => createdAt,
      getDestinationAccount: () => destinationWalletId
    })
  }
}
