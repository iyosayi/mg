import mongoose from 'mongoose'
import { DatabaseError, InvalidPropertyError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'
import {
  IWallet,
  IWalletModel,
  IWalletTransactions,
  ID,
  Create,
  IWalletDb,
  IWalletResult,
  Deposit,
  IWalletTransactionsResult,
  Populated,
  IWalletDoc
} from '../wallet-interfaces/i.wallet'
import { logger } from '../../configuration/logging/logger'

export class WalletDatabase implements IWalletDb {
  constructor(
    private Wallet: IWalletModel,
    private usersDb: IUserDb,
    private WalletTransaction: any
  ) {
    this.create = this.create.bind(this)
    this.deposit = this.deposit.bind(this)
    this.transfer = this.transfer.bind(this)
    this.findByAccountId = this.findByAccountId.bind(this)
    this.findTransactions = this.findTransactions.bind(this)
    this.findUserById = this.findUserById.bind(this)
  }

  async create({ ...walletDetails }: Create): Promise<IWalletResult> {
    try {
      const { userId } = walletDetails
      const wallet = new this.Wallet({ ...walletDetails })
      await wallet.save()
      const user = await this.usersDb.findById({ id: userId })
      if (!user) {
        logger.error('walletdb.create.failed', { ...walletDetails })
        throw new DatabaseError('Wallet could not be created, no user found.')
      }
      user.walletId = wallet._id
      await user.save()
      return wallet
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async deposit({
    ...walletDetails
  }: Deposit): Promise<IWalletTransactionsResult> {
    try {
      const { userId } = walletDetails
      const newTransaction = await new this.WalletTransaction({
        ...walletDetails
      })
      await newTransaction.save()
      const wallet = await this.Wallet.findOne({ userId })
      if (!wallet) {
        logger.error('walletdb.deposit.failed', { ...walletDetails })
        throw new InvalidPropertyError(
          'Deposit failed, account does not exist.'
        )
      }
      wallet.balance += newTransaction.amount
      wallet.walletTransactions.push(newTransaction)
      await wallet.save()
      return newTransaction
    } catch (error) {
      // logging.error(`An error occured: Error ${error}`)
      throw new DatabaseError(error)
    }
  }

  async transfer({ ...walletDetails }: IWalletTransactions) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const { userId, destinationWalletId, amount } = walletDetails
        const sender = await this.Wallet.findOne({ userId }).session(session)
        const receiver = await this.Wallet.findOne({
          _id: destinationWalletId
        }).session(session)
        if (!sender) {
          logger.error('walletdb.transfer.sender.not.found', {
            ...walletDetails
          })
          throw new InvalidPropertyError('User information invalid')
        }

        if (!receiver) {
          logger.error('walletdb.transfer.receiver.not.found', {
            ...walletDetails
          })
          throw new InvalidPropertyError('Receipient does not exist.')
        }
        sender.balance -= amount
        await sender.save({ session })
        receiver.balance += amount
        await receiver.save({ session })
        const newTransfer = new this.WalletTransaction({ ...walletDetails })
        await newTransfer.save({ session })
        sender.walletTransactions.push(newTransfer)
        await sender.save({ session })
        receiver.walletTransactions.push(newTransfer)
        await receiver.save({ session })
      })
    } catch (error) {
      logger.error(error)
      throw new DatabaseError(error)
    } finally {
      session.endSession()
    }
  }

  async findByAccountId({
    id: _id
  }: {
    id: ID
  }): Promise<IWalletResult | null> {
    const found = await this.Wallet.findOne({ _id }).populate(
      'walletTransactions'
    )
    return found
  }

  async findUserById({ id: _id }: { id: ID }): Promise<IWalletResult | null> {
    const found = await this.Wallet.findOne({ userId: _id }).populate(
      'walletTransactions'
    )
    return found
  }

  async withdraw({ ...walletDetails }: IWalletTransactions) {
    try {
      const { amount, userId } = walletDetails
      const user = await this.Wallet.findOne({ userId })
      if (!user) {
        logger.error('walletdb.withdraw.user.not.found', { ...walletDetails })
        throw new InvalidPropertyError('User account does not exist.')
      }
      user.balance -= amount
      await user.save()
      const withdrawal = new this.WalletTransaction({ ...walletDetails })
      await withdrawal.save()
      user.walletTransactions.push(withdrawal)
      await user.save()
      return withdrawal
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async findTransactions({ id: _id }: { id: ID }) {
    return this.WalletTransaction.findById(_id)
  }
}
