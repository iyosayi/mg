import { EscrowDeposit } from './fund.transaction'
import escrowDb from '../models'
import transactionDb from '../../transactions/models'

export const escrowDeposit = new EscrowDeposit(transactionDb, escrowDb)
