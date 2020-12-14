import makeUser from '../entities'
import { IUserInput, IUserDb } from '../user-interfaces/i.user'
import { UniqueConstraintError } from '../../helpers/Errors'
import publisher from '../../pubsub/publisher'
import consumer from '../../pubsub/subscriber'
// import { verifyUser } from '../../mail'
import { makeCreateWallet } from '../../wallet/use-cases'

export class AddUser {
  constructor(private usersDb: IUserDb) {}

  async add({ ...userInfo }: IUserInput) {
    const exists = await this.usersDb.findByEmail(userInfo.email)
    if (exists) {
      throw new UniqueConstraintError('Email address')
    }
    const user = makeUser(userInfo)
    const userSource = user.getSource()
    const newUser = await this.usersDb.insert({
      email: user.getEmail(),
      password: user.getPassword(),
      phoneNumber: user.getPhoneNumber(),
      source: {
        ip: userSource.getIp(),
        browser: userSource.getBrowser(),
        referrer: userSource.getReferrer()
      },
      createdOn: user.getCreatedAt(),
      modifiedOn: user.getModifiedAt()
    })
    const id = newUser.user._id
    await makeCreateWallet.createWallet({ id })
    await publisher(id.toString(), 'newuser.verify')
    // await consumer('verify_queue', verifyUser, '*.verify')
    return newUser
  }
}
