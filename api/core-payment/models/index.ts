import { EscrowDatabase } from './EscrowDb'
import models from '../../database/models'

const { Escrow, User, Transaction } = models

const escrowDb = new EscrowDatabase(Escrow, User, Transaction)
export default escrowDb
