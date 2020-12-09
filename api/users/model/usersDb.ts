/* eslint-disable no-underscore-dangle */
import mongoose, { Types, Document } from 'mongoose'
import { IUserDoc, IUserModel, UserResult } from './userModel'
// import { createToken, hashPassword } from 'mguard-utils/auth'
import { createToken, hashPassword } from '../../helpers/jsonwt'
import { DatabaseError } from '../../helpers/Errors'
import { IUser } from '../UInterface/IUser'

const objectId = mongoose.Types.ObjectId

type UserToken = {
  token: string
  issued: number
  expires: number
} 

type ID = Types.ObjectId

type Populated<M, K extends keyof M> = Omit<M, K> & {[P in K]: Exclude<M[P], ID[] | ID>} 
type Select<M, K extends keyof M> = Pick<M, K> & Document

export class UserDatabase {
  constructor(private UserDoc: IUserModel) {}

  async insert({ ...userInfo }: IUser) {
    try {
      if (userInfo.password) {
        // eslint-disable-next-line no-param-reassign
        userInfo.password = await hashPassword(userInfo.password)
      }
      const user: IUserDoc = new this.UserDoc({ ...userInfo })

      const partialSession = {
        id: user._id,
        email: user.email
      }

      const userToken = createToken(
        partialSession,
        'hello',
      )
      await user.save()
      return { user, userToken }
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async update({id: _id , ...changes}: {id: string, changes: string[]}): Promise<string[]> {
    const result: IUserDoc = await this.UserDoc.where(_id)
      .updateOne({ $set: { ...changes } })
      .exec()
    return result.modifiedPaths()
  }

  async findByEmail(email: string) {
    const found = await this.UserDoc.findOne({ email }).populate('transactions') as Populated<IUserDoc, 'transactions'>
    return found
  }

  async findById(id: ID) {
    return this.UserDoc.findById(id)
    .populate('transactions') 
    .select('-password -__v -createdOn -modifiedOn -isVerified -source') 
  }

  async findAll() {
    return this.UserDoc.find().select('-password') 
  }
}

//as Select<IUserDoc, 'password'> findAll

// as Select<IUserDoc, 'password' | '__v' | 'createdOn' | 'modifiedOn' | 'isVerified'> findByID