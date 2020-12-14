import { ListUser } from './list.user'
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

describe('List user', () => {
  it('finds a user by id', async () => {
    const user = makeFakeUser()
    const inserted = await usersDb.insert(user)
    const listUser = new ListUser(usersDb)
    const found = await listUser.get({ id: inserted.user._id })
    expect(found).toBeDefined()
  })
})
