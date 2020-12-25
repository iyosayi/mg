/* eslint-disable no-underscore-dangle */
import { Types, Document } from 'mongoose'
import {
  IUserDoc,
  IUserModel,
  IUserResult,
  IUserInput,
  IUserDb,
  IUser
} from '../user-interfaces/i.user'
import { createToken, hashPassword } from '../../helpers/jsonwt'
import { DatabaseError, InvalidPropertyError } from '../../helpers/Errors'
import { logger } from '../../configuration/logging/logger'

type ID = Types.ObjectId

type Populated<M, K extends keyof M> = Omit<M, K> &
  { [P in K]: Exclude<M[P], ID[] | ID> }

type Select<M, K extends keyof M> = Pick<M, K> & Document

function transformId(id: string) {
  return Types.ObjectId(id)
}

export class UserDatabase implements IUserDb {
  constructor(private UserDoc: IUserModel) {}

  async insert({ ...userInfo }: IUserInput) {
    try {
      if (userInfo.password) {
        userInfo.password = await hashPassword(userInfo.password)
      }
      const user = new this.UserDoc({ ...userInfo })
      const partialSession = {
        id: user._id,
        email: user.email
      }
      const userToken = createToken(partialSession)
      await user.save()
      return { user, userToken }
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async update({ id: _id, ...changes }: { id: string } & IUser) {
    const result = await this.UserDoc.updateOne(
      { _id: transformId(_id) },
      { $set: { ...changes } }
    )
    return result.nModified > 0 ? { id: _id, ...changes } : null
  }

  async findByEmail({ email }: { email: string }) {
    const found = (await this.UserDoc.findOne({ email }).populate(
      'transactions'
    )) as Populated<IUserDoc, 'transactions'>

    return found
  }

  async findById({ id: _id }: { id: string }): Promise<IUserDoc | null> {
    const found = await this.UserDoc.findById(transformId(_id)).populate(
      'transactions'
    )
    if (!found) {
      logger.warn('usersdb.findbyid.user.not.found', { _id })
      throw new InvalidPropertyError('User does not exist.')
    }
    return found
  }

  async findAll() {
    return this.UserDoc.find().select('-password')
  }

  async remove({ id: _id }: { id: string }) {
    return this.UserDoc.findByIdAndDelete(transformId(_id))
  }
}
