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
    createdOn: Date.now(),
    modifiedOn: Date.now(),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    }
  }

  return {
    ...user,
    ...overrides
  }
}
