import { EscrowDatabase } from './escrow.db'
// import { User } from '../../users/model/user.model'
// import { Transaction } from '../../transactions/models/transaction.model'
// import { Escrow } from './escrow.model'

import models from '../../database/models'
const { Escrow, User, Transaction } = models

const escrowDb = new EscrowDatabase(Escrow, User, Transaction)
export default escrowDb
