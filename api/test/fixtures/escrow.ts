import { v4 } from 'ip-regex'
import { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Id = Types.ObjectId

export const makeFakeEscrowDeposit = (overrides?: object) => {
  const escrowDeposit = {
    amountPaid: 30000,
    referenceId: uuidv4(),
    userId: new Id()
  }

  return { ...escrowDeposit, ...overrides }
}
