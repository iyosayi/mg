import {InvalidPropertyError, RequiredParameterError} from '../../helpers/errors'

export default function makeVerifyBankAccount({usersDb}) {
  return async function verifyBankAccount({id, acountNumber}) {
    if(!acountNumber) {
      throw new RequiredParameterError('Bank Account')
    }

    if(!id) {
      throw new RequiredParameterError('Id')
    }

    const user = await usersDb.findById({id})
    if(!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    // const {fullName} = user
    // const updated = await usersDb.update({id, fullName})
  }
}