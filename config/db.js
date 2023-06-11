const mongoose = require('mongoose')
const config = require('config')

const db = config.get("mongoURI")

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(db, {
      useNewUrlParser: true
    })
    console.log('MongoDB esta conectado...')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB