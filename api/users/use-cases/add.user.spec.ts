import { AddUser } from './add-user'
import { setupDB } from '../../test/db'
import { UserDatabase } from '../model/usersDb'
import { makeFakeUser } from '../../test/fixtures/user'
import models from '../../database/models'

const { User } = models

jest.setTimeout(30000)
setupDB('user')

let usersDb: UserDatabase
beforeAll(() => {
  usersDb = new UserDatabase(User)
})

describe('Add User', () => {
  it('inserts a user into the database', async () => {
    const user = makeFakeUser()
    const addUser = new AddUser(usersDb)
    const inserted = await addUser.add(user)
    expect(inserted).toHaveProperty('userToken')
  })

  it('user password should be hashed', async () => {
    const user = makeFakeUser({ password: 'Jesusisreal1234!!' })
    const addUser = new AddUser(usersDb)
    const inserted = await addUser.add(user)
    expect(inserted.user.password.length).toBeGreaterThan(10)
  })

  it('should throw an error on missing fields', async () => {
    const user = makeFakeUser({ password: null })
    const addUser = new AddUser(usersDb)
    expect(addUser.add(user)).rejects.toThrow(
      'Password must be at least 8 characters long and must contain at least one Uppercase character, one special sign and a number.'
    )
  })

  it('should have a source', async () => {
    const user = makeFakeUser()
    const addUser = new AddUser(usersDb)
    const inserted = await addUser.add(user)
    expect(inserted.user.source.ip).toBeDefined()
    expect(inserted.user.source.browser).toBeDefined()
    expect(inserted.user.source.referrer).toBeDefined()
  })
})
