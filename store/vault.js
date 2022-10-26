/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  vault: [],
  filteredVault: [],
  vaultFilter: '',
  vaultSearch: '',
  vaultSort: 'name',
  vaultSortDirection: 'asc',
})

export const getters = {
  getVaultItems: (state) => {
    if (
      state.filteredVault.length === 0 &&
      (state.vaultFilter === '' || state.vaultSearch === '') &&
      state.vaultFilter !== 'all'
    ) {
      return state.vault
    } else {
      return state.filteredVault
    }
  },
  getVaultItemByID: (state) => (uuid) => {
    const item = state.vault.find((item) => item.uuid === uuid)
    return item
  },
}

export const actions = {
  async fetchVaultData({ state, commit, dispatch }) {
    const response = await this.$axios.get('/api/storage')
    // console.log('%% ~ fetchVaultData ~ response', response)
    if (response.status === 200) {
      await dispatch('decryptResponseData', response)
    }
    return state.vault
  },
  decryptResponseData({ state, commit, rootGetters }, response) {
    const data = [...response.data]
    const decryptedData = []

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const decryptedItem = this.$decryptData(
          item.data,
          rootGetters['auth/username'],
          rootGetters['auth/password']
        )
        decryptedItem._id = item._id
        decryptedItem.createdAt = item.createdAt
        decryptedItem.updatedAt = item.updatedAt
        decryptedData.push(decryptedItem)
      }
    }
    commit('SET_VAULT_DATA', decryptedData)
  },
  filterVaultItems({ state, commit }, filter) {
    commit('SET_VAULT_FILTER', filter)
    return state.filteredVault
  },
  sortVaultItems({ state, commit }, sort) {
    commit('SET_VAULT_SORT', sort)
    return state.filteredVault
  },
  searchVaultItems({ state, commit }, searchString) {
    commit('SET_VAULT_SEARCH', searchString)
    return state.filteredVault
  },
  async createVaultItem({ state, commit, dispatch, rootGetters }, item) {
    const encryptedItem = this.$encryptData(
      rootGetters['auth/username'],
      rootGetters['auth/password'],
      JSON.stringify(item)
    )

    const response = await this.$axios.post('/api/storage/create', {
      item: { data: encryptedItem },
    })
    if (response.status === 200) {
      commit('REFRESH_VAULT_FILTER')
      return await dispatch('fetchVaultData')
    } else {
      console.error('%% ~ createVaultItem ~ response error', response)
    }
  },
  async deleteVaultItem({ state, commit, dispatch }, _id) {
    const response = await this.$axios.delete(`/api/storage/delete/${_id}`)
    if (response.status === 200) {
      commit('REFRESH_VAULT_FILTER')
      return await dispatch('fetchVaultData')
    } else {
      console.error('%% ~ deleteVaultItem ~ response error', response)
    }
  },
  async updateVaultItem({ state, commit, dispatch, rootGetters }, itemData) {
    const encryptedItem = this.$encryptData(
      rootGetters['auth/username'],
      rootGetters['auth/password'],
      JSON.stringify(itemData.item)
    )

    const response = await this.$axios.put(
      `/api/storage/update/${itemData._id}`,
      {
        item: { data: encryptedItem },
      }
    )
    if (response.status === 200) {
      commit('REFRESH_VAULT_FILTER')
      dispatch('fetchVaultData')
    } else {
      console.error('%% ~ updateVaultItem ~ response error', response)
    }
  },
  clearFilters({ commit }) {
    commit('REFRESH_VAULT_FILTER')
  },
  clearVaultData({ state, commit }) {
    commit('REFRESH_VAULT_FILTER')
    commit('CLEAR_VAULT_DATA')
  },
}

export const mutations = {
  SET_VAULT_DATA(state, data) {
    if (!deepEqual(data, state.vault)) {
      state.vault = [...new Set([...data])]
    }
  },
  SET_VAULT_FILTER(state, filter) {
    if (filter && state.vaultFilter !== filter) {
      state.vaultFilter = filter

      if (filter.toLowerCase() === 'all') {
        state.filteredVault = []
        state.vaultFilter = ''
      } else {
        state.filteredVault = state.vault.filter((item) =>
          item.category.toLowerCase().includes(filter.toLowerCase())
        )
      }
    }
  },
  SET_VAULT_SORT(state, sort) {
    if (sort && state.vaultSort !== sort) {
      state.vaultSort = sort

      if (sort.toLowerCase() === 'name') {
        state.filteredVault = state.filteredVault.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else if (sort.toLowerCase() === 'date') {
        state.filteredVault = state.filteredVault.sort((a, b) => {
          if (a.dateTimestamp < b.dateTimestamp) {
            return -1
          }
          if (a.dateTimestamp > b.dateTimestamp) {
            return 1
          }
          return 0
        })
      }
    }
  },
  SET_VAULT_SEARCH(state, searchString) {
    if (searchString === '') {
      state.filteredVault = []
    }

    if (searchString && state.vaultSearch !== searchString) {
      state.vaultSearch = searchString
      state.filteredVault = state.vault.filter((item) =>
        item.title.toLowerCase().includes(searchString.toLowerCase())
      )
    }
  },
  CLEAR_VAULT_DATA(state) {
    state.vault = []
    state.filteredVault = []
  },
  REFRESH_VAULT_FILTER(state) {
    state.filteredVault = []
    state.vaultFilter = ''
    state.vaultSort = 'name'
    state.vaultSearch = ''
  },
}

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }
  return true
}
function isObject(object) {
  return object != null && typeof object === 'object'
}
