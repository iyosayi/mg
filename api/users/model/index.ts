import { UserDatabase } from './usersDb'
import models from '../../database/models'
import { createToken, hashPassword } from '../../helpers/jsonwt'

const { User } = models

const usersDb: UserDatabase = new UserDatabase(User)
export default usersDb
