// eslint-disable-next-line no-unused-vars
const { dictionary } = require('./eff_large.js')

class PasswordGenerator {
  /**
   * Generates a random password of the specified length with the specified characters.
   *
   * @param characterTypes the types of characters to include in the password
   * @param length         the length of the password
   * @return the password
   */
  generateRandomPassword(characterTypes, length) {
    const buffer = []
    let characters = []

    switch (characterTypes) {
      case 'ALPHA':
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        break

      case 'ALPHANUMERIC':
        characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        break

      case 'ALPHANUMERICSYMBOL':
        characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()'
        break

      case 'NUMERIC':
        characters = '1234567890'
        break
    }

    const charactersLength = characters.length
    const array = crypto.getRandomValues(new Uint32Array(charactersLength))

    for (let i = 0; i < length; i++) {
      const index = array[i] % charactersLength
      buffer.push(characters[index])
    }

    return buffer.join('')
  }

  /**
   * Generates a passphrase from the supplied dictionary with the requested word count.
   *
   * @param delimiter  delimiter to place between words
   * @param words      the count of words you want in your passphrase
   * @param dictionary the dictionary to use for generating this passphrase
   * @return the passphrase
   */
  generatePassphrase(delimiter, words) {
    let result = ''
    const array = crypto.getRandomValues(new Uint32Array(words + 1))
    const max = dictionary.length
    for (let i = 1; i <= words; i++) {
      result += dictionary.words[array[i] % max]

      if (i < words) {
        result += delimiter
      }
    }
    return result
  }
}

const passwordGenerator = new PasswordGenerator()

export default (context, inject) => {
  inject('pswd', passwordGenerator)
  context.$pswd = passwordGenerator
}
