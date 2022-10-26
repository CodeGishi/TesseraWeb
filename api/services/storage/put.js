// eslint-disable-next-line no-unused-vars
import { User, Item } from '../../models/user'

const updateItem = async (userId, itemID, item) => {
  const result = await Item.findByIdAndUpdate(itemID, item)

  if (result !== null) {
    return { success: true, message: 'Item updated', item: result }
  } else {
    return { success: false, message: 'Item not found' }
  }
}

export default {
  updateItem,
}
