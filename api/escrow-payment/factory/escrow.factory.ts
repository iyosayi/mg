/* eslint-disable no-return-assign */
import { RequiredParameterError } from '../../helpers/Errors'
import { IUuid, EscrowFactory } from '../escrow-interfaces/i.escrow'

export default function buildMakeEscrowDetails({ uuidv4 }: IUuid) {
  return function makeEscrow({
    amountPaid,
    referenceId,
    buyerId
  }: EscrowFactory) {
    if (!amountPaid) {
      throw new RequiredParameterError('Amount')
    }

    if (typeof amountPaid !== 'number') {
      amountPaid = parseFloat(amountPaid)
    }

    if (!referenceId) {
      throw new RequiredParameterError('Reference Id.')
    }

    if (!buyerId) {
      throw new RequiredParameterError('Buyer Id.')
    }

    let paymentId: string
    let escrowCharge: number

    /**
     * Escrow fee for amount being deposited
     */
    const ESCROW_FEE_ABOVE_TWO_HUNDRED_THOUSAND = 0.025
    const ESCROW_FEE_BELOW_TWO_HUNDRED_THOUSAND = 0.018
    const BANK_CHARGES = 100

    if (amountPaid >= 200000) {
      escrowCharge = ESCROW_FEE_ABOVE_TWO_HUNDRED_THOUSAND * amountPaid + BANK_CHARGES
    } else {
      escrowCharge = ESCROW_FEE_BELOW_TWO_HUNDRED_THOUSAND * amountPaid + BANK_CHARGES
    }
    function generateId() {
      return uuidv4()
    }

    return Object.freeze({
      getAmount: () => amountPaid,
      getReference: () => referenceId,
      getBuyerId: () => buyerId,
      getPaymentId: () => paymentId || (paymentId = generateId()),
      getEscrowCharge: () => escrowCharge
    })
  }
}
