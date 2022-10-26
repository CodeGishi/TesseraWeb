const aes256 = require('aes256')
const sha256 = require('js-sha256')
const bcrypt = require('bcryptjs')

/**
 *
 * @param {*} username
 * @param {*} password
 * @param {*} secret
 * @returns
 */
function encryptData(username, password, secret) {
  const customSalt = bcrypt.genSaltSync(10)
  const key = bcrypt.hashSync(password, customSalt)
  const encryptedSecret = aes256.encrypt(key, secret)
  const encryptedData = customSalt + encryptedSecret
  return encryptedData
}

/**
 *
 * @param {*} pill
 * @param {*} username
 * @param {*} password
 * @returns
 */
function decryptData(encryptedData, username, password) {
  if (encryptedData !== undefined && username && password) {
    try {
      const userSalt = getUserSalt(encryptedData)
      const encryptedSecret = getEncryptedSecret(encryptedData)
      const key = bcrypt.hashSync(password, userSalt)
      const decryptedSecret = aes256.decrypt(key, encryptedSecret)
      const decryptedSecretJSON = JSON.parse(decryptedSecret)
      return decryptedSecretJSON
    } catch (e) {
      console.error('%% ~ decryptData ~ error', e)
      return null
    }
  } else {
    console.error('%% ~ decryptData ~ No data')
  }
  return null
}

function getUserSalt(encryptedData) {
  if (encryptedData) {
    const salt = encryptedData.slice(0, 29)
    return salt
  }
}

function getEncryptedSecret(encryptedData) {
  if (encryptedData) {
    const encryptedSecret = encryptedData.slice(29)
    return encryptedSecret
  }
}

function hashUserData(username, password) {
  const pswdSalt = generatePasswordSalt(username, password)
  const passwordHash = hashPassword(password, generateBCryptSalt(pswdSalt))
  const usernameHash = sha256(username)
  return { username: usernameHash, password: passwordHash }
}

function generatePasswordSalt(username, password) {
  const passwordSalt = sha256(username + password).slice(-22)
  return passwordSalt
}

function generateBCryptSalt(salt) {
  const header = '$2a$10$'
  const bcryptSalt = header + salt
  return bcryptSalt
}

const hashPassword = (password, salt) => {
  const hash = bcrypt
    .hashSync('password', salt, function (err, hash) {
      if (err) {
        return err
      }
    })
    .slice(-40)

  return hash
}

export default (context, inject) => {
  inject('hashUserData', hashUserData)
  context.$hashUserData = hashUserData

  inject('decryptData', decryptData)
  context.$decryptData = decryptData

  inject('encryptData', encryptData)
  context.$encryptData = encryptData
}
