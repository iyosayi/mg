import mongoose from 'mongoose'

const vendorSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    ref: 'User'
  },
  url: String,
  businessName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  phoneNumber: {
    type: String,
    required: true
  },
  socialMedia: {},
  username: {
    type: String,
    required: true
  }
})

export default vendorSchema
