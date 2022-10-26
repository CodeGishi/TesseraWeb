// eslint-disable-next-line no-unused-vars
import { User, Item } from '../../models/user'

const deleteItem = async (userId, itemId) => {
  const user = await User.findById(userId)
  const item = await Item.findByIdAndDelete(itemId)

  // delete item from user's storage
  user.storage.pull(item)
  // delete the item
  await item.delete()
  const result = await user.save()

  return result
}

export default {
  deleteItem,
}
