<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Search and Filters Section -->
    <div class="max-w-7xl mx-auto">
      <!-- Search Bar -->
      <div class="mb-8" data-aos="fade-in">
        <div class="relative flex items-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for courses by title or keyword"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @input="updateSearchQuery"
          />
          <button
            class="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            @click="filterCourses"
          >
            <i class="fas fa-search mr-2"></i>
            Search
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
        <!-- Categories -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-lg mb-3">Categories</h4>
          <div class="space-y-2">
            <label
              v-for="category in categories"
              :key="category"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="selectedCategories"
                @change="updateSelectedCategories(selectedCategories)"
                class="rounded text-blue-600"
              />
              <span>{{ category }}</span>
              
            </label>
          </div>
        </div>

        <!-- Difficulty -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-lg mb-3">Difficulty Levels</h4>
          <div class="space-y-2">
            <label
              v-for="difficulty in difficulties"
              :key="difficulty"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="difficulty"
                v-model="selectedDifficulty"
                @change="updateSelectedDifficulty(selectedDifficulty)"
                class="rounded-full text-blue-600"
              />
              <span>{{ difficulty }}</span>
            </label>
          </div>
        </div>

        <!-- Price Range -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-lg mb-3">Price Range</h4>
          <div class="space-y-4">
            <input
              type="range"
              v-model="priceRange[1]"
              :min="0"
              :max="1000"
              step="10"
              @change="updatePriceRange(priceRange)"
              class="w-full"
            />
            <div class="flex justify-between">
              <span>${{ priceRange[0] }}</span>
              <span>${{ priceRange[1] }}</span>
            </div>
          </div>
        </div>

        <!-- Sort By -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-lg mb-3">Sort By</h4>
          <select
            v-model="sortBy"
            @change="updateSortBy(sortBy)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rated">Highest Rated</option>
          </select>
        </div>
      </div>

      <!-- Course Listings -->
      <div data-aos="fade-in">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Available Courses ({{ filteredCourses.length }})
        </h2>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 text-red-500">
          {{ error }}
          <button
            @click="fetchCourses"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- No Results -->
        <div v-else-if="filteredCourses.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">No courses match your filters. Try adjusting your search criteria.</p>
        </div>

        <!-- Courses Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="course in paginatedCourses"
            :key="course.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            data-aos="fade-up"
          >
            <div class="relative">
              <img
                :src="course.image"
                :alt="course.title"
                class="w-full h-48 object-cover"
              />
              <div
                v-if="course.price === 0"
                class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
              >
                FREE
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                <router-link
                  :to="'/courses/' + course.id"
                  class="hover:text-blue-600 transition-colors"
                >
                  {{ course.title }}
                </router-link>
              </h3>
              <p class="text-gray-600 text-sm mb-2">By {{ course.instructor }}</p>
              <p class="text-gray-700 text-sm mb-3 line-clamp-2">{{ course.description }}</p>
              
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="flex text-yellow-400 mr-1">
                    <span v-for="star in 5" :key="star">
                      <svg
                        class="w-4 h-4"
                        :class="{ 'text-gray-300': star > Math.round(course.rating) }"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <span class="text-gray-600 text-sm">{{ course.rating.toFixed(1) }}</span>
                </div>
                <span class="text-gray-900 font-semibold">
                  {{ course.price === 0 ? 'Free' : '$' + course.price }}
                </span>
              </div>

              <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ course.duration || '8 hours' }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ course.students }} students
                </span>
              </div>

              <router-link
                :to="'/courses/' + course.id"
                class="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center" data-aos="fade-up">
          <nav class="flex items-center space-x-2">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{ 'bg-blue-600 text-white': currentPage === page }"
              class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              {{ page }}
            </button>
            
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'CourseCards',
  data() {
    return {
      localSearchQuery: ''
    }
  },
  computed: {
    ...mapState('courses', [
      'loading',
      'error',
      'searchQuery',
      'selectedCategories',
      'selectedDifficulty',
      'priceRange',
      'sortBy',
      'currentPage',
      'filteredCourses'
    ]),
    ...mapGetters('courses', [
      'paginatedCourses',
      'totalPages',
      'categories',
      'difficulties'
    ]),
    searchQuery: {
      get() {
        return this.$store.state.courses.searchQuery
      },
      set(value) {
        this.localSearchQuery = value
      }
    }
  },
  methods: {
    ...mapActions('courses', [
      'fetchCourses',
      'filterCourses',
      'updateSearchQuery',
      'updateSelectedCategories',
      'updateSelectedDifficulty',
      'updatePriceRange',
      'updateSortBy',
      'changePage'
    ])
  },
  created() {
    this.fetchCourses()
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    })
  }
}
</script>

<style>
/* Import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Custom animation for spin */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Line clamp for description */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>