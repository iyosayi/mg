/* eslint-disable no-undef */
import { UserFactory } from './UserFactory'
import { makeFakeUser } from '../../test/fixtures/user'

describe.skip('Users', () => {
  it('must have an email', () => {
    const user = makeFakeUser({ email: null })
    const userFactory = new UserFactory(user)
    expect(() => userFactory.makeUser()).toThrow(
      'Please enter a valid email address.'
    )
  })

  it('must have a valid email', () => {
    const user = makeFakeUser({ email: 'king.com' })
    const userFactory = new UserFactory(user)
    expect(() => userFactory.makeUser()).toThrow(
      'Please enter a valid email address.'
    )
  })

  it('must have a phoneNumber', () => {
    const user = makeFakeUser({ phoneNumber: null })
    const userFactory = new UserFactory(user)
    expect(() => userFactory.makeUser()).toThrow(
      'Please enter a valid phone number.'
    )
  })

  it('must have a valid source', () => {
    const noSource = makeFakeUser({ source: undefined })
    const userFactory = new UserFactory(noSource)
    expect(() => userFactory.makeUser()).toThrow(
      'User must have a valid source.'
    )
  })

  it('must have a valid ip', () => {
    const ip = makeFakeUser({ source: { ip: undefined } })
    const userFactory = new UserFactory(ip)
    expect(() => userFactory.makeUser()).toThrow('Source must have a valid ip.')
  })

  it('must have a referrer', () => {
    const withReferrer = makeFakeUser()
    const userFactory = new UserFactory(withReferrer)
    expect(userFactory.getUser().source.referrer).toBe(
      withReferrer.source.referrer
    )
  })

  it('must have a password', () => {
    const user = makeFakeUser({ password: null })
    const userFactory = new UserFactory(user)
    expect(() => userFactory.makeUser()).toThrow(
      'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
    )
  })

  it('must have a valid password', () => {
    const user = makeFakeUser({ password: null })
    const userFactory = new UserFactory(user)
    expect(() => userFactory.makeUser()).toThrow(
      'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
    )
  })

  it('must have a valid date', () => {
    const noCreatedOn = makeFakeUser({ createdOn: undefined })
    expect(noCreatedOn.createdOn).not.toBeDefined()
  })
})
