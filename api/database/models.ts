import { model } from 'mongoose'
import {
  IWalletDoc,
  IWalletTransactionsDoc
} from '../wallet/wallet-interfaces/i.wallet'
import { WalletSchema } from '../wallet/models/wallet.model'
import { WalletTransactionSchema } from '../wallet/models/wallet.transaction.model'
import { UserSchema } from '../users/model/user.model'
import { IUserDoc } from '../users/user-interfaces/i.user'
import { TransactionSchema } from '../transactions/models/transaction.model'
import { ITransactionDoc } from '../transactions/transaction-interfaces/i.transaction'
import { EscrowSchema } from '../escrow-payment/models/escrow.model'
import { IEscrowDoc } from '../escrow-payment/escrow-interfaces/i.escrow'
// import disputeSchema from '../disputes/models/disputeModel'
// import walletTransactionSchema from '../wallet/models/walletTransactionModel'
// import vendorSchema from '../personal-link/models/vendorModel'

const models = {
  User: model<IUserDoc>('User', UserSchema),
  Transaction: model<ITransactionDoc>('Transaction', TransactionSchema),
  Wallet: model<IWalletDoc>('Wallet', WalletSchema),
  WalletTransaction: model<IWalletTransactionsDoc>(
    'WalletTransaction',
    WalletTransactionSchema
  ),
  Escrow: model<IEscrowDoc>('Escrow', EscrowSchema)
  // Dispute: model('Dispute', disputeSchema),
  // Vendor: model('Vendor', vendorSchema)
}

export default models
