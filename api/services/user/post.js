/* eslint-disable */
import { User } from '../../models/user'

const create = async (user) => {
  const status = await User.create(user)

  if (!user) {
    throw new Error('User create failed')
  }
  return status
}

export default {
  create,
}
