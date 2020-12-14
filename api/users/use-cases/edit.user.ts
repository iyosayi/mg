import makeUser from '../entities'
import { IUserDb, IUserInput} from '../user-interfaces/i.user'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/Errors'

export class EditUser {
  constructor(private usersDb: IUserDb) {
    this.update = this.update.bind(this)
  }

  async update({ ...changes }: IUserInput) {
    const { id } = changes
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const exists = await this.usersDb.findById({ id })
    if (!exists) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const user = makeUser(changes)
    const userSource = user.getSource()
    return this.usersDb.update({
      email: user.getEmail(),
      password: user.getPassword(),
      phoneNumber: user.getPhoneNumber(),
      source: {
        ip: userSource.getIp(),
        browser: userSource.getBrowser(),
        referrer: userSource.getReferrer()
      },
      modifiedOn: user.getModifiedAt(),
      id
    })
  }
}
