import { User, Item } from '../../models/user'

const addItem = async (id, item) => {
  const user = await User.findById(id)
  const newItem = await Item.create(item)
  await user.storage.push(newItem)
  const result = await user.save()
  return result
}

export default {
  addItem,
}
