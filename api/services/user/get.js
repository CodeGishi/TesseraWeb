/* eslint-disable */
import { User } from '../../models/user'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const all = async () => User.find({})

const byId = async (_id) => User.find({ _id })

const byEmailAndPassword = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error("Can't find given User")
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Password does not match any user')
  }

  return isPasswordMatch
    ? {
        secret: generateAccessToken(user),
        success: true,
      }
    : { secret: null, success: false }
}

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1800s',
    }
  )
}

const storageById = async (id) => {
  const user = await User.findById(id).populate('storage')
  return user.storage
}

const itemById = async (id, itemId) => {
  const user = await User.findById(id).populate('storage')
  const item = user.storage.find((item) => item._id == itemId)
  return item
}

export default {
  all,
  byId,
  byEmailAndPassword,
  storageById,
  itemById,
}
