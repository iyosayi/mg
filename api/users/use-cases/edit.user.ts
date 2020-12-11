import { UserFactory } from '../entities/UserFactory'
import { IUser, UserDatabase } from '../model/userModel'
import { InvalidPropertyError, RequiredParameterError } from '../../helpers/Errors'
import { ID } from '../../wallet/models/walletModel'

export class EditUser {
  constructor(private usersDb: UserDatabase ) {}

  async update(id: ID, {...changes}: IUser) {
    console.log(id, changes)
    if(!id) {
      throw new RequiredParameterError('Id')
    }
    const exists = await this.usersDb.findById({ id })
    if (!exists) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const userFactory = new UserFactory(changes) // this appears in a object like so, changes = {changes: IUser} // fix
    userFactory.makeUser()
    return this.usersDb.update(id, {...changes})
  }
}

