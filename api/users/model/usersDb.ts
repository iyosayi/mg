/* eslint-disable no-underscore-dangle */
import mongoose, { Types, Document } from 'mongoose'
import { IUserDoc, IUser, IUserModel, IUserResult } from './userModel'
// import { createToken, hashPassword } from 'mguard-utils/auth'
import { createToken, hashPassword } from '../../helpers/jsonwt'
import { DatabaseError } from '../../helpers/Errors'

type ID = Types.ObjectId

type Populated<M, K extends keyof M> = Omit<M, K> &
  { [P in K]: Exclude<M[P], ID[] | ID> }

type Select<M, K extends keyof M> = Pick<M, K> & Document

export class UserDatabase {
  constructor(private UserDoc: IUserModel) {}

  async insert({
    ...userInfo
  }: IUser): Promise<{ user: IUserResult; userToken: string }> {
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

  async update(id : ID, { ...changes }: IUser): Promise<IUserResult> {
    const result: IUserResult = await this.UserDoc.updateOne(
      { id },
      { ...changes }
    )
    return result
  }

  async findByEmail(email: string) {
    const found = (await this.UserDoc.findOne({ email }).populate(
      'transactions'
    )) as Populated<IUserDoc, 'transactions'>

    return found
  }

  async findById({ id: _id }: { id: ID }) {
    const found = await this.UserDoc.findById(_id).populate('transactions')
    if (!found) return
    type FindById =
      | Omit<
          IUserResult,
          'source' | 'isVerified' | 'password' | '__v' | 'modifiedOn'
        >
      | undefined
    const toReturn: FindById = {
      email: found.email,
      phoneNumber: found.phoneNumber,
      balance: found.balance,
      businessName: found.businessName,
      transactions: found.transactions,
      walletId: found.walletId,
      disputes: found.disputes,
      link: found.link,
      cacNumber: found.cacNumber,
      createdOn: found.createdOn,
      address: found.address,
      _id
    }
    return toReturn
  }

  async findAll() {
    return this.UserDoc.find().select('-password')
  }
}

//as Select<IUserDoc, 'password'> findAll

// as Select<IUserDoc, 'password' | '__v' | 'createdOn' | 'modifiedOn' | 'isVerified'> findByID
