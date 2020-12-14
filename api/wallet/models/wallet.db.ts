import mongoose from 'mongoose'
import { DatabaseError, InvalidPropertyError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'
import {
  IWalletModel,
  IWalletTransactions,
  ID,
  Create,
  IWalletDb,
  IWalletResult,
  Deposit,
  IWalletTransactionsResult,
  IWalletTransactionsModel
} from '../wallet-interfaces/i.wallet'
import { logger } from '../../configuration/logging/logger'

export class WalletDatabase implements IWalletDb {
  constructor(
    private Wallet: IWalletModel,
    private usersDb: IUserDb,
    private WalletTransaction: IWalletTransactionsModel
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
      const createdWallet = new this.Wallet({ ...walletDetails })
      await createdWallet.save()
      const user = await this.usersDb.findById({ id: userId })
      if (!user) {
        logger.error('walletdb.create.failed', { ...walletDetails })
        throw new DatabaseError('Wallet could not be created, no user found.')
      }
      user.walletId = createdWallet._id
      await user.save()
      return createdWallet
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async deposit({
    ...walletDetails
  }: Deposit): Promise<IWalletTransactionsResult> {
    try {
      const { userId } = walletDetails
      const newDepositTransaction = new this.WalletTransaction({
        ...walletDetails
      })
      await newDepositTransaction.save()
      const { _id } = newDepositTransaction
      const wallet = await this.Wallet.findOne({ userId })
      if (!wallet) {
        logger.error('walletdb.deposit.failed', { ...walletDetails })
        throw new InvalidPropertyError(
          'Deposit failed, account does not exist.'
        )
      }
      wallet.balance += newDepositTransaction.amount
      wallet.walletTransactions.push(_id) // id of the transaction
      await wallet.save()
      return newDepositTransaction
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async transfer({ ...walletDetails }: IWalletTransactions) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        console.log('from the db', walletDetails)
        const { userId, destinationWalletId, amount } = walletDetails
        const transferInitiator = await this.Wallet.findOne({ userId }).session(
          session
        )
        const transferRecipient = await this.Wallet.findOne({
          _id: destinationWalletId
        }).session(session)
        if (!transferInitiator) {
          logger.error('walletdb.transfer.transferInitiator.not.found', {
            ...walletDetails
          })
          throw new InvalidPropertyError('User information invalid')
        }

        if (!transferRecipient) {
          logger.error('walletdb.transfer.transferRecipient.not.found', {
            ...walletDetails
          })
          throw new InvalidPropertyError('Receipient does not exist.')
        }
        transferInitiator.balance -= amount
        await transferInitiator.save({ session })
        transferRecipient.balance += amount
        await transferRecipient.save({ session })
        const newTransfer = new this.WalletTransaction({ ...walletDetails })
        await newTransfer.save({ session })
        const { _id } = newTransfer
        transferInitiator.walletTransactions.push(_id) // id of the transaction
        await transferInitiator.save({ session })
        transferRecipient.walletTransactions.push(_id) // id of the transaction
        await transferRecipient.save({ session })
        return newTransfer
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
      const userWallet = await this.Wallet.findOne({ userId })
      if (!userWallet) {
        logger.error('walletdb.withdraw.userWallet.not.found', {
          ...walletDetails
        })
        throw new InvalidPropertyError('User account does not exist.')
      }
      userWallet.balance -= amount
      await userWallet.save()
      const newWithdrawal = new this.WalletTransaction({ ...walletDetails })
      await newWithdrawal.save()
      userWallet.walletTransactions.push(newWithdrawal._id) // id of the transaction
      await userWallet.save()
      return newWithdrawal
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async findTransactions({ id: _id }: { id: ID }) {
    return this.WalletTransaction.findById(_id)
  }
}
