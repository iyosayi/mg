import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'
import { ID, IUser, IUserDb } from '../user-interfaces/i.user'

export class RemoveUser {
  constructor(private usersDb: IUserDb) {
    this.remove = this.remove.bind(this)
  }

  async remove({ id }: { id: ID }) {
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const userToDelete = await this.usersDb.findById({ id })
    if (!userToDelete) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { _id } = userToDelete

    const hardDelete = async (user: IUser) => {
      await this.usersDb.remove({ id: _id })
      return {
        deletedCount: 1,
        message: 'User deleted.'
      }
    }

    function deleteNothing() {
      return {
        deletedCount: 0,
        message: 'User not found, nothing to delete.'
      }
    }

    if (!userToDelete) {
      return deleteNothing()
    }
    return hardDelete(userToDelete)
  }
}
