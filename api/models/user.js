const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

// eslint-disable-next-line no-unused-vars
const item = new Schema(
  {
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    password: { type: String, required: true },
    storage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    ],
  },
  {
    timestamps: true,
  }
)

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR)
  next()
})

export const User = mongoose.model('User', UserSchema)
export const Item = mongoose.model('item', item)
