import { Types, Schema, model } from 'mongoose'
import { IEscrow, IEscrowDoc } from '../escrow-interfaces/i.escrow'

const EscrowSchemaFields: Record<keyof IEscrow, any> = {
  amountPaid: {
    type: Number,
    required: true
  },
  referenceId: {
    type: String,
    required: true
  },
  buyerId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  transactionId: {
    type: Types.ObjectId,
    ref: 'Transaction'
  },
  isTransactionFunded: {
    type: Boolean,
    default: false,
    required: true
  },
  escrowCharge: {
    type: Number,
    required: true
  },
  paymentMadeAt: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  hasCustomerBeingPaid: {
    type: Boolean,
    default: false
  }
}

export const EscrowSchema = new Schema(EscrowSchemaFields)
export const Escrow = model<IEscrowDoc>('Escrow', EscrowSchema)
