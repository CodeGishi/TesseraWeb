import { v4 as uuidv4 } from 'uuid'

function getUUID() {
  const uuid = uuidv4()
  return uuid
}

export default (context, inject) => {
  inject('getUUID', getUUID)
  context.$getUUID = getUUID
}
