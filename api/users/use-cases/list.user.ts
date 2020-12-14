import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { ID, IUserDb } from '../user-interfaces/i.user'

/* eslint-disable no-return-await */
export class ListUser {
  constructor(private usersDb: IUserDb) {
    this.get = this.get.bind(this)
  }

  async get({ id }: { id: ID }) {
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const found = await this.usersDb.findById({ id })
    if (!found) {
      throw new InvalidPropertyError('User does not exist.')
    }
    return found
  }
}
