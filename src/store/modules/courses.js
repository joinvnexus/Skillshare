const state = {
allCourses: [],           // All courses loaded from API or data file
  filteredCourses: [],      // Courses after applying filters/search/sort
  loading: false,           // Loading state for async operations
  error: null,              // Error message if fetching fails
  selectedCourse: null,     // Course selected for quick view or detail
  searchQuery: '',          // Current search input
  selectedCategories: [],   // Selected categories/tags for filtering
  selectedLevels: [],       // Selected difficulty levels for filtering
  priceRange: [0, 1000],    // Selected price range for filtering
  sortBy: 'newest',         // Current sort option
  currentPage: 1,           // Current page for pagination
  itemsPerPage: 9,          // Number of courses per page
  popularCourses: [],       // Popular courses for homepage/sections
  featuredCourses: [],      // Featured courses for homepage/sections
  currentCourse: null,      // Currently viewed course details
  relatedCourses: []        // Courses related to the current course
}

const mutations = {
  // Set all courses and initialize filteredCourses
  // Set all courses and initialize filteredCourses
  SET_COURSES(state, courses) {
    state.allCourses = courses
    state.filteredCourses = courses
  },
  // Set filtered courses after applying filters
  SET_FILTERED_COURSES(state, courses) {
    state.filteredCourses = courses
  },
  // Set loading state
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  // Set error message
  SET_ERROR(state, error) {
    state.error = error
  },
  // Set selected course for quick view or detail
  SET_SELECTED_COURSE(state, course) {
    state.selectedCourse = course
  },
  // Set popular courses
  SET_POPULAR_COURSES(state, courses) {
    state.popularCourses = courses
  },
  // Set featured courses
  SET_FEATURED_COURSES(state, courses) {
    state.featuredCourses = courses
  },
  // Set search query
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query
  },
  // Set selected categories for filtering
  SET_SELECTED_CATEGORIES(state, categories) {
    state.selectedCategories = categories
  },
  // Set selected levels for filtering
  SET_SELECTED_LEVELS(state, levels) {
    state.selectedLevels = levels
  },
  // Set price range for filtering
  SET_PRICE_RANGE(state, range) {
    state.priceRange = range
  },
  // Set sort option
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy
  },
  // Set current page for pagination
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  // Set current course details for detail page
  SET_CURRENT_COURSE(state, course) {
    state.currentCourse = course
  },
  // Set related courses for recommendations
  SET_RELATED_COURSES(state, courses) {
    state.relatedCourses = courses
  }
}

const actions = {
  // Fetch all courses (simulate API call)
  async fetchCourses({ commit },courseId) {
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
  // Filter courses based on search, categories, levels, price, and sort
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
  // Update search query and refilter
  updateSearchQuery({ commit, dispatch }, query) {
    commit('SET_SEARCH_QUERY', query)
    dispatch('filterCourses')
  },
  // Update selected categories and refilter
  updateSelectedCategories({ commit, dispatch }, categories) {
    commit('SET_SELECTED_CATEGORIES', categories)
    dispatch('filterCourses')
  },
  // Update selected levels and refilter
  updateSelectedLevels({ commit, dispatch }, levels) {
    commit('SET_SELECTED_LEVELS', levels)
    dispatch('filterCourses')
  },
  // Update price range and refilter
  updatePriceRange({ commit, dispatch }, range) {
    commit('SET_PRICE_RANGE', range)
    dispatch('filterCourses')
  },
  // Update sort option and refilter
  updateSortBy({ commit, dispatch }, sortBy) {
    commit('SET_SORT_BY', sortBy)
    dispatch('filterCourses')
  },
  // Change current page and scroll to top
  changePage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  // Open quick view modal for a course
  openQuickView({ commit }, course) {
    commit('SET_SELECTED_COURSE', course)
  },
  // Close quick view modal
  closeQuickView({ commit }) {
    commit('SET_SELECTED_COURSE', null)
  },
  // Reset all filters to default and refilter
  resetFilters({ commit, dispatch }) {
    commit('SET_SELECTED_CATEGORIES', [])
    commit('SET_SELECTED_LEVELS', [])
    commit('SET_PRICE_RANGE', [0, 1000])
    commit('SET_SEARCH_QUERY', '')
    dispatch('filterCourses')
  },
}

const getters = {
  // Get paginated courses for current page
  paginatedCourses: (state) => {
    const start = (state.currentPage - 1) * state.itemsPerPage
    const end = start + state.itemsPerPage
    return state.filteredCourses.slice(start, end)
  },
  // Get total number of pages
  totalPages: (state) => {
    return Math.ceil(state.filteredCourses.length / state.itemsPerPage)
  },
  // Get all unique categories/tags from all courses
  allCategories: (state) => {
    const allTags = state.allCourses.flatMap(course => course.tags)
    return [...new Set(allTags)]
  },
  // Get all unique levels from all courses
  allLevels: (state) => {
    return [...new Set(state.allCourses.map(course => course.level))]
  },
  // Get popular courses
  getPopularCourses: state => state.popularCourses,
  // Get top 3 featured courses
  getFeaturedCourses: state => state.featuredCourses.slice(0, 3),
  // Get total count of filtered courses
  courseCount(state) {
    return state.filteredCourses.length
  },
  // Check if any filter is active
  hasFilters(state) {
    return (
      (state.selectedCategories && state.selectedCategories.length > 0) ||
      (state.selectedLevels && state.selectedLevels.length > 0) ||
      (state.priceRange && (state.priceRange[0] !== 0 || state.priceRange[1] !== 0)) ||
      (state.searchQuery && state.searchQuery.trim() !== '')
    )
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}