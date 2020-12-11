/* eslint-disable class-methods-use-this */
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

export default class IndividualUserFactory {
  constructor(upperFirst, isValidEmail, isValidPassword, makeSource) {
    this._upperFirst = upperFirst
    this._isValidEmail = isValidEmail
    this._isValidPassword = isValidPassword
    this._makeSource = makeSource
  }

  makeUser({
    email = requiredParam('Email'),
    phoneNumber = requiredParam('Phone number'),
    source,
    password = requiredParam('Password'),
    createdOn = Date.now(),
    modifiedOn = Date.now()
  }) {
    if (!this._isValidEmail(email)) {
      throw new InvalidPropertyError('Please enter a valid email address.')
    }
    if (!source) {
      throw new InvalidPropertyError('User must have a valid source.')
    }
    if (!this._isValidPassword(password)) {
      throw new InvalidPropertyError(
        'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
      )
    }

    const validSource = this._makeSource(source)
    return Object.freeze({
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email.toLowerCase(),
      getSource: () => validSource,
      getPassword: () => password,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })
  }
}
