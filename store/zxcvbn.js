/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const zxcvbn = require('zxcvbn')

export const state = () => ({
  password: '',
  guesses: 1,
  guesses_log10: 0,
  sequence: [],
  calc_time: 1,
  crack_times_seconds: {
    online_throttling_100_per_hour: 36,
    online_no_throttling_10_per_second: 0.1,
    offline_slow_hashing_1e4_per_second: 0.0001,
    offline_fast_hashing_1e10_per_second: 1e-10,
  },
  crack_times_display: {
    online_throttling_100_per_hour: '',
    online_no_throttling_10_per_second: '',
    offline_slow_hashing_1e4_per_second: '',
    offline_fast_hashing_1e10_per_second: '',
  },
  score: 0,
  feedback: {
    warning: '',
    suggestions: [],
  },
  result: {},
})

export const getters = {
  password: (state) => state.password,
  guesses: (state) => state.guesses,
  guesses_log10: (state) => state.guesses_log10,
  sequence: (state) => state.sequence,
  calc_time: (state) => state.calc_time,
  crack_times_seconds: (state) => state.crack_times_seconds,
  crack_times_display: (state) => state.crack_times_display,
  score: (state) => state.score,
  feedback: (state) => state.feedback,
  result: (state) => state.result,
}

export const actions = {
  calculate({ state, commit }, passwordString) {
    commit('SET_PASSWORD', passwordString)
    commit('SAVE_RESULT', zxcvbn(passwordString))
    return state.result
  },
}

export const mutations = {
  SET_PASSWORD(state, passwordString) {
    state.password = passwordString
    return state.password
  },
  SAVE_RESULT(state, result) {
    state.guesses = result.guesses
    state.guesses_log10 = result.guesses_log10
    state.sequence = result.sequence
    state.calc_time = result.calc_time
    state.crack_times_seconds = result.crack_times_seconds
    state.crack_times_display = result.crack_times_display
    state.score = result.score
    state.feedback = result.feedback

    state.result = result
  },
}
