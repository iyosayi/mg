/* eslint-disable no-undef */
import makeUser from '.'
import { makeFakeUser } from '../../test/fixtures/user'

describe('Users', () => {
  it('must have an email', () => {
    const user = makeFakeUser({ email: null })
    expect(() => makeUser(user)).toThrow('Email cannot be null or undefined.')
  })

  it('must have a valid email', () => {
    const user = makeFakeUser({ email: 'king.com' })
    expect(() => makeUser(user)).toThrow('Please enter a valid email address.')
  })

  it('must have a phoneNumber', () => {
    const user = makeFakeUser({ phoneNumber: null })
    expect(() => makeUser(user)).toThrow(
      'Phone number cannot be null or undefined.'
    )
  })

  it('must have a valid source', () => {
    const noSource = makeFakeUser({ source: undefined })
    expect(() => makeUser(noSource)).toThrow(
      'User source cannot be null or undefined.'
    )
  })

  it('must have a valid ip', () => {
    const ip = makeFakeUser({ source: { ip: undefined } })
    expect(() => makeUser(ip)).toThrow('Source must have a valid ip.')
  })

  it('must have a referrer', () => {
    const withReferrer = makeFakeUser()
    expect(withReferrer.source.referrer).toBe(withReferrer.source.referrer)
  })

  it('must have a password', () => {
    const user = makeFakeUser({ password: null })
    expect(() => makeUser(user)).toThrow(
      'Password cannot be null or undefined.'
    )
  })

  it('must have a valid password', () => {
    const user = makeFakeUser({ password: 'Jesusi12' })
    expect(() => makeUser(user)).toThrow(
      'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
    )
  })

  it('must have a valid date', () => {
    const noCreatedOn = makeFakeUser({ createdOn: undefined })
    expect(noCreatedOn.createdOn).not.toBeDefined()
  })
})
