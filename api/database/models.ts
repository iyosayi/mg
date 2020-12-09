import { model } from 'mongoose'
import { IUserDoc } from '../users/model/userModel'
import { UserSchema } from '../users/model/userModel'
import { EscrowSchema, IEscrowDoc } from '../core-payment/models/escrowModel'
import { IOneOffDoc, OneOffSchema } from '../transactions/models/OneOffModel'
// import disputeSchema from '../disputes/models/disputeModel'
// import walletSchema from '../wallet/models/walletModel'
// import walletTransactionSchema from '../wallet/models/walletTransactionModel'
// import vendorSchema from '../personal-link/models/vendorModel'

const models = {
  User: model<IUserDoc>('User', UserSchema),
  Transaction: model<IOneOffDoc>('Transaction', OneOffSchema),
  Escrow: model<IEscrowDoc>('Escrow', EscrowSchema)
  // Dispute: model('Dispute', disputeSchema),
  // Wallet: model('Wallet', walletSchema),
  // WalletTransaction: model('WalletTransaction', walletTransactionSchema),
  // Vendor: model('Vendor', vendorSchema)
}

// Object.values(models).forEach((model) => {
//   if (!model) {
//     model.createCollection()
//   }
// })

export default models
