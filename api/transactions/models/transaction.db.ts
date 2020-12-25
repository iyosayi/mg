import { Types } from 'mongoose'
import { DatabaseError } from '../../helpers/Errors'
import { IUserModel } from '../../users/user-interfaces/i.user'
import {
  ITransaction,
  ITransactionModel,
  ITransactionDb,
  ITransactionResult
} from '../transaction-interfaces/i.transaction'

function transformId(id: string) {
  return Types.ObjectId(id)
}
export class TransactionDb implements ITransactionDb {
  constructor(
    private User: IUserModel,
    private Transaction: ITransactionModel
  ) {}

  async insert({
    userId,
    ...transactionInfo
  }: { userId: string } & ITransaction) {
    try {
      const newTransaction = new this.Transaction({ ...transactionInfo })
      await newTransaction.save()
      const user = await this.User.findById({ _id: transformId(userId) })
      user?.transactions.push(newTransaction._id)
      await user?.save()
      return newTransaction
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async update({
    id: _id,
    ...changes
  }: {
    id: string
  } & ITransactionResult): Promise<ITransactionResult | null> {
    const result = await this.Transaction.updateOne(
      { _id: transformId(_id) },
      { $set: { ...changes } }
    )
    // @ts-ignore
    return result.nModified > 0 ? { id: _id, ...changes } : null
  }

  async remove({ id: _id }: { id: string }) {
    return this.Transaction.findByIdAndDelete(transformId(_id))
  }

  async findById({
    id: _id
  }: {
    id: string
  }): Promise<ITransactionResult | null> {
    return this.Transaction.findById(transformId(_id)).populate('initiator')
  }

  async findByRef({
    referenceId
  }: {
    referenceId: string
  }): Promise<ITransactionResult | null> {
    return this.Transaction.findOne({ referenceId })
  }

  async findAll() {
    return this.Transaction.find().populate('initiator')
  }
}
