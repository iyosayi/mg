import UserFactory from './UserFactory'
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

export default class BusinessOwnerFactory extends UserFactory {
  constructor() {
    super()
  }

  makeUser({
    businessName = requiredParam('Business name'),
    address = requiredParam('Address'),
    cacNumber,
    email = requiredParam('Email'),
    phoneNumber = requiredParam('Phone number'),
    source,
    username = requiredParam('Username'),
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
      getFirstName: () => this._upperFirst(businessName),
      getLastName: () => this._upperFirst(address),
      getPhoneNumber: () => phoneNumber,
      getEmail: () => email.toLowerCase(),
      getSource: () => validSource,
      getUsername: () => username,
      getPassword: () => password,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getCacNumber: () => cacNumber
    })
  }
}
