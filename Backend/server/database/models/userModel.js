const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  accountId: String,
  title: String,
  amount: Number,
  description: String,
})

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String,
    accounts: [accountSchema],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

module.exports = mongoose.model('User', userSchema)