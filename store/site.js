/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  currentPage: '',
  currentLanguage: 'pl',
  device: {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  },
  scrollLock: false,
  pageHeight: 0,
})

export const getters = {
  getCurrentPage: (state) => state.currentPage,
  getCurrentLanguage: (state) => state.currentLanguage,
  isMobile: (state) => state.device.isMobile,
  isTablet: (state) => state.device.isTablet,
  isDesktop: (state) => state.device.isDesktop,
  isScrollLocked: (state) => state.scrollLock,
  getPageHeight: (state) => state.pageHeight,
}

export const actions = {
  setDevice({ commit }, viewWidth) {
    commit('SET_DEVICE', viewWidth)
  },
  setScrollLock({ commit }, isLocked) {
    commit('SET_SCROLL_LOCK', isLocked)
  },
}

export const mutations = {
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  SET_DEVICE(state, viewWidth) {
    if (viewWidth < 768) {
      state.device.isMobile = true
      state.device.isTablet = false
      state.device.isDesktop = false
    }
    if (viewWidth >= 768 && viewWidth < 1024) {
      state.device.isMobile = false
      state.device.isTablet = true
      state.device.isDesktop = false
    }
    if (viewWidth >= 1024) {
      state.device.isMobile = false
      state.device.isTablet = false
      state.device.isDesktop = true
    }
  },
  SET_SCROLL_LOCK(state, isLocked) {
    state.scrollLock = isLocked
  },
  SET_PAGE_HEIGHT(state, height) {
    state.pageHeight = height
  },
}
