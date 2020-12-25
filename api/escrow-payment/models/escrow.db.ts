import mongoose from 'mongoose'
import { ITransactionModel } from '../../transactions/transaction-interfaces/i.transaction'
import { IUserModel } from '../../users/user-interfaces/i.user'
import {
  IEscrowModel,
  ID,
  IEscrowDb,
  EscrowDeposit,
  IEscrowDoc,
  IEscrow
} from '../escrow-interfaces/i.escrow'

export class EscrowDatabase implements IEscrowDb {
  constructor(
    public escrowModel: IEscrowModel,
    public userModel: IUserModel,
    public transactionModel: ITransactionModel
  ) {}

  async findById({ id: _id }: { id: ID }) {
    return this.escrowModel.findById(_id)
  }

  async findByRef({ ref }: { ref: string }) {
    return this.escrowModel.findOne({ reference: ref })
  }

  async initiateMoneyTransfer({
    receiverId,
    amountPaid,
    transactionId,
    escrowCharge
  }: {
    receiverId: ID
    amountPaid: number
    transactionId: ID
    escrowCharge: number
  }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const foundEscrow = await this.escrowModel
          .findOne({ transactionId })
          .session(session)
        if (!foundEscrow) return

        const user = await this.userModel
          .findById({ _id: receiverId })
          .session(session)

        if (!user) return
        const balance: number = amountPaid - escrowCharge

        foundEscrow.amountPaid -= balance
        await foundEscrow.save({ session })
        user.balance += balance
        await user.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async deposit({ ...transactionDetails }: EscrowDeposit): Promise<IEscrowDoc> {
    const newEscrowDoc = new this.escrowModel({ ...transactionDetails })
    await newEscrowDoc.save()
    return newEscrowDoc
  }

  async findEscrow({ transactionId }: { transactionId: ID }) {
    const found = await this.escrowModel.findOne({
      transactionId
    })
    return found
  }

  async findAll() {
    return this.escrowModel
      .find()
      .populate('currentTransaction')
      .populate('sellerInfo')
      .exec()
  }

  async update({id: _id, ...changes }: {id:ID}&IEscrow) {

    const found = await this.escrowModel.updateOne(
      { _id },
      { $set: { ...changes } }
    )
    return found.modifiedPaths()
  }
}
