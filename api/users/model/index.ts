import { UserDatabase } from './users.db'
// import { User } from './user.model'
import models from '../../database/models'

const { User } = models

const usersDb: UserDatabase = new UserDatabase(User)
export default usersDb
