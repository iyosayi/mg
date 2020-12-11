import faker from 'faker'
import mongoose from 'mongoose'

const Id = Object.freeze({
  makeId: mongoose.Types.ObjectId
})

export const makeFakeUser = (overrides?: object) => {
  const user = {
    email: faker.internet.email(),
    password: 'Jesusisreal1234!!@',
    phoneNumber: '09020491830',
    balance: 40000,
    isVerified: true,
    createdOn: new Date(),
    modifiedOn: new Date(),
    walletId: Id.makeId(),
    disputes: [],
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    },
    dob: faker.date.past(),
    username: faker.name.findName(),
    // _id: Id.makeId(),
    initiator: Id.makeId(),
    transactions: []
  }

  return {
    ...user,
    ...overrides
  }
}
