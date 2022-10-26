/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  isOpen: false,
  create: false,
  edit: false,
  delete: false,
  preview: false,
  modalData: {},
})

export const getters = {
  isOpen: (state) => state.isOpen,
  create: (state) => state.create,
  edit: (state) => state.edit,
  delete: (state) => state.delete,
  preview: (state) => state.preview,
  modalData: (state) => state.modalData,
}

export const actions = {
  openModal({ commit, dispatch }, modal) {
    commit('OPEN_MODAL', modal)
  },
  setModalData({ commit }, data) {
    commit('SET_MODAL_DATA', data)
  },
  closeModal({ commit, dispatch }) {
    commit('CLOSE_MODAL')
  },
}

export const mutations = {
  OPEN_MODAL(state, modal) {
    switch (modal) {
      case 'create':
        state.create = true
        break
      case 'edit':
        state.edit = true
        break
      case 'delete':
        state.delete = true
        break
      case 'preview':
        state.preview = true
        break
      default:
        break
    }
    state.isOpen = true
  },
  SET_MODAL_DATA(state, data) {
    state.modalData = data
  },
  CLOSE_MODAL(state) {
    state.create = false
    state.edit = false
    state.delete = false
    state.preview = false

    state.isOpen = false
  },
}
