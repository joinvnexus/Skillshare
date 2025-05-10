const state = {
  allPaths: [],
  currentPath: null,
  isLoading: false,
  error: null
}

const mutations = {
  SET_PATHS(state, paths) {
    state.allPaths = paths
  },
  SET_CURRENT_PATH(state, path) {
    state.currentPath = path
  },
  SET_LOADING(state, status) {
    state.isLoading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchAllPaths({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - in real app, use axios or fetch
      const response = await import('@/data/learning-paths.json')
      commit('SET_PATHS', response.default)
      return response.default
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchPathBySlug({ commit, state, dispatch }, slug) {
    try {
      commit('SET_LOADING', true)
      
      // Load all paths if not already loaded
      if (state.allPaths.length === 0) {
        await dispatch('fetchAllPaths')
      }
      
      const path = state.allPaths.find(p => p.slug === slug)
      if (!path) {
        throw new Error(`Path with slug "${slug}" not found`)
      }
      
      commit('SET_CURRENT_PATH', path)
      return path
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  beginnerPaths: state => state.allPaths.filter(p => p.level === 'beginner'),
  intermediatePaths: state => state.allPaths.filter(p => p.level === 'intermediate'),
  advancedPaths: state => state.allPaths.filter(p => p.level === 'advanced'),
  featuredPaths: state => state.allPaths.slice(0, 3) // Get first 3 as featured
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}