import userFactory from '../factory'
import { UniqueConstraintError } from '../../helpers/errors'
import publisher from '../../pubsub/publisher'
import consumer from '../../pubsub/subscriber'
import { verifyUser } from '../../mail'
import { createWallet } from '../../wallet/use-cases'

const makeAddUser = ({ usersDb }) => {
  return async function addUser(userInfo) {
    const user = userFactory.makeUser(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (exists) {
      throw new UniqueConstraintError('Email address')
    }

    const userSource = user.getSource()
    const newUser = await usersDb.insert({
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword(),
      createdOn: user.getCreatedOn(),
      modifiedOn: user.getModifiedOn(),
      source: {
        ip: userSource.getIp(),
        browser: userSource.getBrowser(),
        referrer: userSource.getReferrer()
      }
    })
    const id = newUser.user._id
    await createWallet({ id })
    await publisher(id.toString(), 'newuser.verify')
    await consumer('verify_queue', verifyUser, '*.verify')
    return newUser
  }
}

export default makeAddUser
