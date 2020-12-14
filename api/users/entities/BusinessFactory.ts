import { UserFactory } from './user.factory'
import { IUser } from '../user-interfaces/i.user'
import {
  isValidEmail,
  makeSource,
  isValidPassword,
  upperFirst
} from '../../helpers/utils'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'

export default class BusinessOwnerFactory extends UserFactory {
  constructor(public user: IUser) {
    super(user)
  }

  makeUser(): Readonly<object> {
    const {
      email,
      source,
      password,
      createdOn,
      address,
      phoneNumber,
      businessName,
      cacNumber
    } = this.user

    if (!email || !isValidEmail(email)) {
      throw new InvalidPropertyError('Please enter a valid email address.')
    }

    if (!source) {
      throw new InvalidPropertyError('User must have a valid source.')
    }

    if (!phoneNumber) {
      throw new InvalidPropertyError('Please enter a valid phone number.')
    }

    if (!password) {
      throw new RequiredParameterError('Password')
    }
    if (!isValidPassword(password)) {
      throw new InvalidPropertyError(
        'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
      )
    }

    if (!businessName) {
      throw new RequiredParameterError('Business name')
    }
    if (!cacNumber) {
      throw new RequiredParameterError('CAC Number')
    }

    const validSource = makeSource(source)
    return Object.freeze({
      getEmail: () => email.toLowerCase(),
      getPhoneNumber: () => phoneNumber,
      getPassword: () => password,
      getBusinessName: () => upperFirst(businessName as string),
      getCreatedOn: () => createdOn,
      getAddress: () => address,
      getSource: () => validSource
    })
  }
}
