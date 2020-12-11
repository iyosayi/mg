import { EditUser } from './edit.user'
import { UserDatabase } from '../model/usersDb'
import { makeFakeUser } from '../../test/fixtures/user'
import { setupDB } from '../../test/db'
import models from '../../database/models'

const { User } = models

setupDB('user')

let usersDb: UserDatabase

beforeAll(() => {
  usersDb = new UserDatabase(User)
})

describe.skip('Edit User', () => {
  it('edits a user', async () => {
    const newUser = makeFakeUser()
    const inserted = await usersDb.insert(newUser)
    const { ...changes } = inserted.user
    const id = inserted.user._id
    const editUser = new EditUser(usersDb)
    const edited = await editUser.update(id, {
      ...changes,
      email: 'king@gmail.com'
    })
    expect(edited.email).toBe('king@gmail.com')
  })
})
