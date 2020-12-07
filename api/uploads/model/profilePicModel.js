import mongoose from 'mongoose'

const profilePicSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  imageID: {
    type: String,
    required: true
  },

  id: {
      type: String,
      required: true
  }
})

export default profilePicSchema