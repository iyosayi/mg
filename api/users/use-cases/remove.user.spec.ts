import { RemoveUser } from './remove.user'
import { UserDatabase } from '../model/users.db'
import { makeFakeUser } from '../../test/fixtures/user'
import { setupDB } from '../../test/db'
import models from '../../database/models'

const { User } = models

setupDB('user')

let usersDb: UserDatabase

beforeAll(() => {
  usersDb = new UserDatabase(User)
})

describe.skip('Remove User', () => {
  it('deletes a user', async () => {
    const newUser = makeFakeUser()
    const inserted = await usersDb.insert(newUser)
    const found = await usersDb.findById({ id: inserted.user._id })
    const removeUser = new RemoveUser(usersDb)
    const toDelete = await removeUser.remove({ id: found?._id })
    const deleted = {
      deletedCount: 1,
      message: 'User deleted.'
    }
    expect(found).toBeDefined()
    expect(toDelete).toEqual(deleted)
  })
})
