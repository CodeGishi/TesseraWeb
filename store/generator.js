/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  password: '',
  length: 16,
  wordCount: 4,
  method: methods[0], // random
  characterTypes: types[2], // alpha
  delimiter: '-',
})

export const getters = {
  password: (state) => state.password,
  length: (state) => state.length,
  wordCount: (state) => state.wordCount,
  method: (state) => state.method,
  characterTypes: (state) => state.characterTypes,
  delimiter: (state) => state.delimiter,
  getSettings: (state) => state,
}

export const actions = {
  generatePassword({ state, commit }) {
    if (state.method === methods[0]) {
      const password = this.$pswd.generatePassphrase(
        state.delimiter,
        state.wordCount
      )
      commit('SET_PASSWORD', password)
    } else {
      const password = this.$pswd.generateRandomPassword(
        state.characterTypes,
        state.length
      )
      commit('SET_PASSWORD', password)
    }
    return state.password
  },
  setDelimeter({ state, commit }, delimiter) {
    commit('SET_DELIMITER', delimiter)
  },
  setWordcount({ state, commit }, wordCount) {
    commit('SET_WORDCOUNT', wordCount)
  },
  setMethod({ state, commit }, method) {
    commit('SET_METHOD', method)
  },
  setCharacterTypes({ state, commit }, characterTypes) {
    commit('SET_CHARACTER_TYPES', characterTypes)
  },
  setLength({ state, commit }, length) {
    commit('SET_LENGTH', length)
  },
  updateSettings({ dispatch }, settings) {
    dispatch('setDelimeter', settings.delimiter)
    dispatch('setWordcount', settings.wordCount)
    dispatch('setMethod', settings.method)
    dispatch('setCharacterTypes', settings.characterTypes)
    dispatch('setLength', settings.length)
  },
}

export const mutations = {
  SET_PASSWORD(state, passwordString) {
    // console.log('%% ~ SET_PASSWORD ~ passwordString', passwordString)
    state.password = passwordString
  },
  SET_DELIMITER(state, delimiter) {
    // console.log('%% ~ SET_DELIMITER ~ delimiter', delimiter)
    state.delimiter = delimiter
  },
  SET_WORDCOUNT(state, wordCount) {
    // console.log('%% ~ SET_WORDCOUNT ~ wordCount', wordCount)
    state.wordCount = wordCount
  },
  SET_METHOD(state, method) {
    // console.log('%% ~ SET_METHOD ~ method', method)
    state.method = method
  },
  SET_CHARACTER_TYPES(state, characterTypes) {
    // console.log('%% ~ SET_CHARACTER_TYPES ~ characterTypes', characterTypes)
    state.characterTypes = characterTypes
  },
  SET_LENGTH(state, length) {
    // console.log('%% ~ SET_LENGTH ~ length', length)
    state.length = length
  },
}

const types = ['ALPHA', 'ALPHANUMERIC', 'ALPHANUMERICSYMBOL', 'NUMERIC']

const methods = ['Passphrase', 'Randomized']
