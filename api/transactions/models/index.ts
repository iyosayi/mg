import { TransactionDb } from './transaction.db'
// import { User } from '../../users/model/user.model'
// import { Transaction } from './transaction.model'
import models from '../../database/models'

const { User, Transaction } = models

const transactionDb = new TransactionDb(User, Transaction)
export default transactionDb
