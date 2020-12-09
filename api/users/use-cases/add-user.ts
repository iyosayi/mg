import { UserFactory } from '../entities/UserFactory'
import { IUserDoc, IUser, UserResult, UserDatabase } from '../model/userModel'
import { UniqueConstraintError } from '../../helpers/Errors'
// import publisher from '../../pubsub/publisher'
// import consumer from '../../pubsub/subscriber'
// import { verifyUser } from '../../mail'
import { createWallet } from '../../wallet/use-cases/'


export class AddUser {
  constructor(public usersDb: UserDatabase) {}

  async add({ ...userInfo }: IUser) {
    const exists = await this.usersDb.findByEmail(userInfo.email)
    if (exists) {
      throw new UniqueConstraintError('Email address')
    }
    const user = new UserFactory(userInfo)
    user.makeUser()
    const { email, ...details } = user.user
    const newUser = await this.usersDb.insert({ email, ...details })
    const id = newUser.user._id
    // await createWallet(id)
    // await publisher(id.toString(), 'newuser.verify')
    // await consumer('verify_queue', verifyUser, '*.verify')
    return newUser
  }
}

