import mongoose from 'mongoose'

const url =
  process.env.DB_URL ||
  'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs'

const setupDB = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      replicaSet: 'rs0'
    })
  } catch (e) {
    return console.log(e)
  }
}

export default setupDB
