const state = {
  allCourses: [],
  filteredCourses: [],
  loading: false,
  error: null,
  selectedCourse: null,
  searchQuery: '',
  selectedCategories: [],
  selectedLevels: [],
  priceRange: [0, 1000],
  sortBy: 'newest',
  currentPage: 1,
  itemsPerPage: 9,
  popularCourses: [],
  featuredCourses: []
}

const mutations = {
  SET_COURSES(state, courses) {
    state.allCourses = courses
    state.filteredCourses = courses
  },
  SET_FILTERED_COURSES(state, courses) {
    state.filteredCourses = courses
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SELECTED_COURSE(state, course) {
    state.selectedCourse = course
  },
  SET_POPULAR_COURSES(state, courses) {
    state.popularCourses = courses
  },
  SET_FEATURED_COURSES(state, courses) {
    state.featuredCourses = courses
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  },
  SET_SELECTED_CATEGORIES(state, categories) {
    state.selectedCategories = categories
  },
  SET_SELECTED_LEVELS(state, levels) {
    state.selectedLevels = levels
  },
  SET_PRICE_RANGE(state, range) {
    state.priceRange = range
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  }
}

const actions = {
  async fetchCourses({ commit }) {
    try {
      commit('SET_LOADING', true)
      // Simulate API call - replace with actual API request
      const response = await import('@/data/courses.json')
      const courses = response.default
      commit('SET_COURSES', courses)
      commit('SET_POPULAR_COURSES', courses.filter(course => course.isPopular))
      commit('SET_FEATURED_COURSES', courses.filter(course => course.isFeatured))
      return courses
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  filterCourses({ commit, state }) {
    let filtered = [...state.allCourses]

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by selected categories
    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter(course =>
        course.tags.some(tag => state.selectedCategories.includes(tag))
      )
    }

    // Filter by selected levels
    if (state.selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        state.selectedLevels.includes(course.level)
      )
    }

    // Filter by price range
    filtered = filtered.filter(course =>
      course.price >= state.priceRange[0] && course.price <= state.priceRange[1]
    )

    // Sort courses
    filtered = [...filtered].sort((a, b) => {
      if (state.sortBy === 'newest') {
        return new Date(b.createdAt || b.dateAdded) - new Date(a.createdAt || a.dateAdded)
      } else if (state.sortBy === 'popular') {
        return b.students - a.students
      } else if (state.sortBy === 'rated') {
        return b.rating - a.rating
      } else if (state.sortBy === 'price-low') {
        return a.price - b.price
      } else if (state.sortBy === 'price-high') {
        return b.price - a.price
      }
      return 0
    })

    commit('SET_FILTERED_COURSES', filtered)
    commit('SET_CURRENT_PAGE', 1)
  },
  updateSearchQuery({ commit, dispatch }, query) {
    commit('SET_SEARCH_QUERY', query)
    dispatch('filterCourses')
  },
  updateSelectedCategories({ commit, dispatch }, categories) {
    commit('SET_SELECTED_CATEGORIES', categories)
    dispatch('filterCourses')
  },
  updateSelectedLevels({ commit, dispatch }, levels) {
    commit('SET_SELECTED_LEVELS', levels)
    dispatch('filterCourses')
  },
  updatePriceRange({ commit, dispatch }, range) {
    commit('SET_PRICE_RANGE', range)
    dispatch('filterCourses')
  },
  updateSortBy({ commit, dispatch }, sortBy) {
    commit('SET_SORT_BY', sortBy)
    dispatch('filterCourses')
  },
  changePage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  openQuickView({ commit }, course) {
    commit('SET_SELECTED_COURSE', course)
  },
  closeQuickView({ commit }) {
    commit('SET_SELECTED_COURSE', null)
  }
}

const getters = {
  paginatedCourses: (state) => {
    const start = (state.currentPage - 1) * state.itemsPerPage
    const end = start + state.itemsPerPage
    return state.filteredCourses.slice(start, end)
  },
  totalPages: (state) => {
    return Math.ceil(state.filteredCourses.length / state.itemsPerPage)
  },
  allCategories: (state) => {
    const allTags = state.allCourses.flatMap(course => course.tags)
    return [...new Set(allTags)]
  },
  allLevels: (state) => {
    return [...new Set(state.allCourses.map(course => course.level))]
  },
  getPopularCourses: state => state.popularCourses,
  getFeaturedCourses: state => state.featuredCourses.slice(0, 3),
  // getCourseById: (state) => (id) => {
  //   return state.allCourses.find(course => course.id === id)
  // },
  courseCount: state => state.filteredCourses.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}