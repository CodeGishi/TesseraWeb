/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  username: '',
  password: '',
  token: null,
})

export const getters = {
  username: (state) => state.username,
  password: (state) => state.password,
  token: (state) => state.token,
  isLoggedIn: (state) => !!state.token,
}

export const actions = {
  login({ commit }, { username, password }) {
    const hashedData = this.$hashUserData(username, password)

    return this.$axios
      .$post('/api/users/login', {
        username: hashedData.username,
        password: hashedData.password,
      })
      .then((response) => {
        if (response.success) {
          commit('SET_TOKEN', response.secret)
          commit('SET_USERNAME', username)
          commit('SET_PASSWORD', password)
        }
        return response
      })
  },

  register({ commit }, { username, password, email }) {
    const hashedData = this.$hashUserData(username, password)

    return this.$axios
      .$post('/api/users/signup', {
        username: hashedData.username,
        email,
        password: hashedData.password,
      })
      .then((response) => {
        if (!response?.success) {
          return response.message
        }
        return response
      })
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_USERNAME', null)
  },
}

export const mutations = {
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_PASSWORD(state, password) {
    state.password = password
  },
  SET_TOKEN(state, token) {
    state.token = token
    this.$axios.defaults.headers.common.Authorization = `Baerer ${token}`
  },
}
