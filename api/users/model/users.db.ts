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

export class UserDatabase implements IUserDb {
  constructor(private UserDoc: IUserModel) {}

  async insert({
    ...userInfo
  }: IUserInput): Promise<{ user: IUserResult; userToken: string }> {
    try {
      if (userInfo.password) {
        // eslint-disable-next-line no-param-reassign
        userInfo.password = await hashPassword(userInfo.password)
      }
      const newUser = new this.UserDoc({ ...userInfo })
      const {
        email,
        password,
        phoneNumber,
        balance,
        transactions,
        walletId,
        disputes,
        isVerified,
        link,
        source,
        createdOn,
        modifiedOn,
        businessName,
        address,
        cacNumber,
        __v,
        _id
      } = newUser
      const user: IUserResult = {
        email,
        password,
        phoneNumber,
        balance,
        transactions,
        walletId,
        disputes,
        isVerified,
        link,
        source,
        createdOn,
        modifiedOn,
        businessName,
        address,
        cacNumber,
        _id,
        __v
      }

      const partialSession = {
        id: user._id,
        email: user.email
      }

      const userToken = createToken(partialSession, 'hello')
      await newUser.save()
      return { user, userToken }
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async update({ ...changes }: IUserInput): Promise<any> {
    const { id } = changes
    const result = await this.UserDoc.updateOne(
      { _id: id },
      { ...changes }
    )
    return result.nModified > 0 ? {id, ...changes} : null
  }

  async findByEmail(email: string) {
    const found = (await this.UserDoc.findOne({ email }).populate(
      'transactions'
    )) as Populated<IUserDoc, 'transactions'>

    return found
  }

  async findById({ id: _id }: { id: ID }): Promise<IUserDoc | null> {
    const found = await this.UserDoc.findById(_id).populate('transactions')
    if (!found) {
      logger.warn('usersdb.findbyid.user.not.found', { _id })
      throw new InvalidPropertyError('User does not exist.')
    }
    return found
  }

  async findAll() {
    return this.UserDoc.find().select('-password')
  }

  async remove({id: _id}: {id: ID}) {
    return this.UserDoc.findByIdAndDelete(_id)
  }
}
