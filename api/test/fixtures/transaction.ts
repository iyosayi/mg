import faker from 'faker'
import mongoose from 'mongoose'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'

const Id = Object.freeze({
  makeId: mongoose.Types.ObjectId
})
const makeFakeTransaction = (overrides?: object) => {
  const transaction = {
    email: faker.internet.email(),
    phoneNumber: 9020491830,
    title: faker.commerce.productName(),
    description: faker.commerce.productAdjective(),
    currency: 'NGN',
    type: 'one-off',
    amount: 3000,
    inspectionPeriod: 2,
    dueDate: Date.now(),
    status: 'Awaiting Confirmation',
    referenceId: uuidv4(),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    },
    userId: Id.makeId().toString(),
    initiatorId: Id.makeId().toString(),
    chargeBearer: 'initiator',
    partyId: shortid.generate()
  }

  return {
    ...transaction,
    ...overrides
  }
}

export default makeFakeTransaction
