import mongoose, { Types } from 'mongoose'
import { IUserDoc, IUserModel } from '../../users/model/userModel'
import { IEscrowModel } from './escrowModel'

type ID = Types.ObjectId

export class EscrowDatabase {
  constructor(
    public escrowModel: IEscrowModel,
    public userModel: IUserModel,
    public transactionModel: any
  ) {}

  async findById({ id: _id }: { id: ID }) {
    return this.escrowModel.findById(_id)
  }

  async findByRef({ ref }: { ref: string }) {
    return this.escrowModel.findOne({ reference: ref })
  }

  async handleMoneyTransfer({
    referenceId,
    receiverId,
    amountPaid
  }: {
    referenceId: ID
    receiverId: ID
    amountPaid: number
  }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const currentTransaction = await this.escrowModel
          .findOne({
            reference: referenceId
          })
          .session(session)
        if (!currentTransaction) return
        currentTransaction.amountPaid -= amountPaid
        await currentTransaction.save({ session })
        const receiver = await this.userModel.findOne({ _id: receiverId })

        if (!receiver) return
        receiver.balance += amountPaid
        await receiver.save({ session })
        const completedTransaction = await this.transactionModel.findOne({
          reference: referenceId
        })
        await completedTransaction.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async transferMoney({
    receiver,
    amountPaid,
    transactionId,
    escrowCharge
  }: {
    receiver: IUserDoc
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
          .findById({ _id: receiver._id })
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

  async deposit({ ...paymentDetails }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const newEscrow = new this.escrowModel({ ...paymentDetails })
        await newEscrow.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async findEscrow({ transactionID }: { transactionID: ID }) {
    const found = await this.escrowModel.findOne({
      transactionId: transactionID
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

  async update({ id: _id, ...changes }: { id: string; changes: string[] }) {
    const found = await this.escrowModel.where(_id).updateOne({
      $set: { ...changes }
    })
    return found.modifiedPaths()
  }
}
