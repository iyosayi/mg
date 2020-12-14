import makeWallet from '.'
import { makeFakeDeposit } from '../../test/fixtures/wallet'

describe('Wallet Factory', () => {
  it('must have an amount', () => {
    const undefinedAmount = makeFakeDeposit({ amount: undefined })
    expect(() => makeWallet(undefinedAmount)).toThrow(
      'Amount must be greater than zero.'
    )
  })

  it('must have an amount greater than zero', () => {
    const undefinedAmount = makeFakeDeposit({ amount: -1 })
    expect(() => makeWallet(undefinedAmount)).toThrow(
      'Amount must be greater than zero.'
    )
  })

  it('must have an operationType specified', () => {
    const undefinedAmount = makeFakeDeposit({ operationType: undefined })
    expect(() => makeWallet(undefinedAmount)).toThrow(
      'Operation type e.g deposit or withdraw cannot be null or undefined.'
    )
  })
})
