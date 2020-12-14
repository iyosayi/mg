import { IUserInput, ISourceInput, ISource } from '../user-interfaces/i.user'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'

export interface IUtils {
  isValidEmail: (email: string) => boolean
  isValidPassword: (password: string) => boolean
  makeSource: (source: ISourceInput) => ISource
}

const buildMakeUserFactory = ({
  isValidEmail,
  isValidPassword,
  makeSource
}: IUtils) => {
  return function makeUser(values: IUserInput) {
    let { email, source, password, phoneNumber, createdOn, modifiedOn } = values

    if (!email) {
      throw new RequiredParameterError('Email')
    }

    if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Please enter a valid email address.')
    }
    if (!password) {
      throw new RequiredParameterError('Password')
    }

    if (!isValidPassword(password)) {
      throw new InvalidPropertyError(
        'Password must be at least 8 characters long and must contain at least one uppercase character and one special sign.'
      )
    }

    if (!phoneNumber) {
      throw new RequiredParameterError('Phone number')
    }

    if (!source) {
      throw new RequiredParameterError('User source')
    }

    const userSource: ISource = makeSource(source)
    createdOn = Date.now()
    modifiedOn = Date.now()
    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password,
      getSource: () => userSource,
      getPhoneNumber: () => phoneNumber,
      getCreatedAt: () => createdOn,
      getModifiedAt: () => modifiedOn
    })
  }
}

export default buildMakeUserFactory
