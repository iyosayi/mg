import mongoose, {Types, Schema, Model, Document} from 'mongoose'
// import mongoose from '../../database/index'

type ID = Types.ObjectId
export interface IEscrow {
  amountPaid: number
  reference: ID,
  buyerId: ID,
  transactionId: ID,
  escrowCharge: number,
  isPaid: boolean,
  paymentMadeAt: Date,
  createdAt: Date,
  updatedAt: Date,
  isCustomerPaid: boolean
} 

const EscrowSchemaFields: Record<keyof IEscrow, any> = {
  amountPaid: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  buyerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  transactionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Transaction'
  },
  escrowCharge: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
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
  isCustomerPaid: {
    type: Boolean,
    default: false
  }
}

export const EscrowSchema = new Schema(EscrowSchemaFields)
export interface IEscrowDoc extends IEscrow, Document{}
export interface IEscrowModel extends Model<IEscrowDoc> {
  _id: ID
}

