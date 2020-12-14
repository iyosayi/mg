import { EditUser } from './edit.user'
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

describe('Edit User', () => {
  it('edits a user', async () => {
    const newUser = makeFakeUser()
    const inserted = await usersDb.insert(newUser)
    const changes = {
      email: 'king@gmail.com',
      password: 'Jesusisreal1234!!',
      phoneNumber: '0902939484993',
      modifiedOn: Date.now(),
      source: {
        ip: '::1',
        browser: 'Firefox',
        referrer: 'https://gmail.com'
      }
    }
    const id = inserted.user._id
    const editUser = new EditUser(usersDb)
    const edited = await editUser.update({
      id,
      ...changes
    })
    expect(edited.email).toBe('king@gmail.com')
  })

  it('modifies the time', async () => {
    const newUser = makeFakeUser()
    const inserted = await usersDb.insert(newUser)
    const changes = {
      email: 'king@gmail.com',
      password: 'Jesusisreal1234!!',
      phoneNumber: '0902939484993',
      modifiedOn: Date.now(),
      source: {
        ip: '::1',
        browser: 'Firefox',
        referrer: 'https://gmail.com'
      }
    }
    const editUser = new EditUser(usersDb)
    const edited = await editUser.update({
      id: inserted.user._id,
      ...changes
    })
    expect(edited.modifiedOn).not.toBe(inserted.user.createdOn)
  })
})
