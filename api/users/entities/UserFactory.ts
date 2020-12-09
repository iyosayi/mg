import { IUser } from '../model/userModel'
import { InvalidPropertyError } from '../../helpers/Errors'
import {
  isValidEmail,
  makeSource,
  isValidPassword,
  upperFirst
} from '../../helpers/utils'

export class UserFactory {
  constructor(public user: IUser) {}
  makeUser(): void{
    const {
      email,
      source,
      password,
      phoneNumber,
      // businessName,
      // createdOn,
      // address,
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

    if (!password || !isValidPassword(password)) {
      throw new InvalidPropertyError(
        'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
      )
    }

    makeSource(source)
    // return Object.freeze({
    //   email: email.toLowerCase(),
    //   getPhoneNumber: () => phoneNumber,
    //   getPassword: () => password,
    //   getBusinessName: () => upperFirst(businessName as string),
    //   getCreatedOn: () => createdOn,
    //   getAddress: () => address,
    //   getSource: () => validSource
    // })
  }
}
