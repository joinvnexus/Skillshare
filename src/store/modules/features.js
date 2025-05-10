const state = {
  features: [],
  learningPaths: [],
  loading: false,
  error: null
}

const mutations = {
  SET_FEATURES(state, features) {
    state.features = features
  },
  SET_LEARNING_PATHS(state, paths) {
    state.learningPaths = paths
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchFeatures({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - replace with actual API call
      const features = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, icon: '/images/feature1-icon.png', title: 'Interactive Lessons', description: 'Engaging, hands-on learning experiences' },
            { id: 2, icon: '/images/feature2-icon.png', title: 'Expert Instructors', description: 'Learn from industry professionals' },
            { id: 3, icon: '/images/feature3-icon.png', title: 'Progress Tracking', description: 'Monitor your learning journey' }
          ])
        }, 500)
      })
      commit('SET_FEATURES', features)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchLearningPaths({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - replace with actual API call
      const paths = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, icon: '/images/path-beginner.png', title: 'Beginner', description: 'Start your journey here', link: '/beginner' },
            { id: 2, icon: '/images/path-intermediate.png', title: 'Intermediate', description: 'Build on your skills', link: '/intermediate' },
            { id: 3, icon: '/images/path-advanced.png', title: 'Advanced', description: 'Master advanced concepts', link: '/advanced' }
          ])
        }, 500)
      })
      commit('SET_LEARNING_PATHS', paths)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  features: state => state.features,
  learningPaths: state => state.learningPaths,
  isLoading: state => state.loading,
  error: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}