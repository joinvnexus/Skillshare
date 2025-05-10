const state = {
  courses: [],
  loading: false,
  error: null,
  selectedCourse: null
}

const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SELECTED_COURSE(state, course) {
    state.selectedCourse = course
  }
}

const actions = {
  async fetchCourses({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - replace with actual API request
      const response = await import('@/data/courses.json')
      commit('SET_COURSES', response.default)
      return response.default
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  openQuickView({ commit }, course) {
    commit('SET_SELECTED_COURSE', course)
  },
  closeQuickView({ commit }) {
    commit('SET_SELECTED_COURSE', null)
  }
}

const getters = {
  featuredCourses: state => state.courses.slice(0, 3) // Get first 3 as featured
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}