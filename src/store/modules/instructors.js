const state = {
  instructors: [],
  loading: false,
  error: null
}

const mutations = {
  SET_INSTRUCTORS(state, instructors) {
    state.instructors = instructors
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchInstructors({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - in real app, replace with actual API request
      const response = await import('@/data/instructors.json')
      commit('SET_INSTRUCTORS', response.default)
      return response.default
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  featuredInstructors: state => state.instructors.slice(0, 4) // Get first 4 as featured
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}