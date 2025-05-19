const state = {
  allCourses: [],
  currentCourse: null,
  relatedCourses: [],
  popularCourses: [],
  featuredCourses: []
}

const mutations = {
  SET_COURSES(state, courses) {
    state.allCourses = courses
  },
  SET_CURRENT_COURSE(state, course) {
    state.currentCourse = course
  },
  SET_RELATED_COURSES(state, courses) {
    state.relatedCourses = courses
  },
  SET_POPULAR_COURSES(state, courses) {
    state.popularCourses = courses
  },
  SET_FEATURED_COURSES(state, courses) {
    state.featuredCourses = courses
  }
}

const actions = {
  async fetchCourses({ commit }) {
    try {
      commit('ui/SET_LOADING', true, { root: true })
      const response = await import('@/data/courses.json')
      const courses = response.default

      commit('SET_COURSES', courses)
      commit('SET_POPULAR_COURSES', courses.filter(course => course.isPopular))
      commit('SET_FEATURED_COURSES', courses.filter(course => course.isFeatured))
      return courses
    } catch (error) {
      commit('ui/SET_ERROR', error.message, { root: true })
      throw error
    } finally {
      commit('ui/SET_LOADING', false, { root: true })
    }
  },
  fetchCourseById({ commit, state }, courseId) {
    const course = state.allCourses.find(c => c.id === courseId)
    commit('SET_CURRENT_COURSE', course)
    // You might want to add logic to fetch related courses here
    return course
  }
}

const getters = {
  getPopularCourses: state => state.popularCourses,
  getFeaturedCourses: state => state.featuredCourses.slice(0, 3),
  getCourseById: state => id => state.allCourses.find(course => course.id === id)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}