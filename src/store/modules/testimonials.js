const state = {
  testimonials: [],
  loading: false,
  error: null
}

const mutations = {
  SET_TESTIMONIALS(state, testimonials) {
    state.testimonials = testimonials
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchTestimonials({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - replace with actual API request
      const response = await import('@/data/testimonials.json')
      commit('SET_TESTIMONIALS', response.default)
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
  featuredTestimonials: state => state.testimonials.slice(0, 4) // Get first 4 as featured
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}