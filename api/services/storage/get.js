// eslint-disable-next-line no-unused-vars
import { User, Item } from '../../models/user'

const storageById = async (id) => {
  const user = await User.findById(id).populate('storage')
  return user.storage
}

const itemById = async (id, itemId) => {
  const item = await Item.findById(itemId)
  return item
}

export default {
  storageById,
  itemById,
}
