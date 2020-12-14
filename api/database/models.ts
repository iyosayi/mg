import { model } from 'mongoose'
import { IUserDoc } from '../users/user-interfaces/i.user'
import { UserSchema } from '../users/model/user.model'
import { EscrowSchema, IEscrowDoc } from '../core-payment/models/escrowModel'
import { IOneOffDoc, OneOffSchema } from '../transactions/models/OneOffModel'
import {
  IWalletDoc,
  IWalletTransactionsDoc
} from '../wallet/wallet-interfaces/i.wallet'
import { WalletSchema } from '../wallet/models/wallet.model'
import { WalletTransactionSchema } from '../wallet/models/wallet.transaction.model'
// import disputeSchema from '../disputes/models/disputeModel'
// import walletTransactionSchema from '../wallet/models/walletTransactionModel'
// import vendorSchema from '../personal-link/models/vendorModel'

const models = {
  User: model<IUserDoc>('User', UserSchema),
  Transaction: model<IOneOffDoc>('Transaction', OneOffSchema),
  Escrow: model<IEscrowDoc>('Escrow', EscrowSchema),
  Wallet: model<IWalletDoc>('Wallet', WalletSchema),
  WalletTransaction: model<IWalletTransactionsDoc>(
    'WalletTransaction',
    WalletTransactionSchema
  )
  // Dispute: model('Dispute', disputeSchema),
  // Vendor: model('Vendor', vendorSchema)
}

export default models
