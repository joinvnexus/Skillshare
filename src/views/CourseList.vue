<template>
  <HeroSection />
  <div class="min-h-screen bg-gray-50 py-8 ">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 text-center" data-aos="fade-in">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Explore Our Courses</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect course to advance your skills
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-1/4" data-aos="fade-right">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <!-- Search -->
            <div class="mb-6">
              <h3 class="font-semibold text-lg mb-3">Search</h3>
              <input
                :value="searchQuery"
                @input="handleSearchInput"
                type="text"
                placeholder="Search courses..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Categories -->
            <div class="mb-6" v-if="allCategories.length">
              <h3 class="font-semibold text-lg mb-3">Categories</h3>
              <div class="space-y-2">
                <label
                  v-for="category in allCategories"
                  :key="category"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    :value="category"
                    :checked="selectedCategories.includes(category)"
                    @change="toggleCategory(category)"
                    class="rounded text-blue-600"
                  />
                  <span>{{ category }}</span>
                </label>
              </div>
            </div>

            <!-- Levels -->
            <div class="mb-6" v-if="allLevels.length">
              <h3 class="font-semibold text-lg mb-3">Difficulty Levels</h3>
              <div class="space-y-2">
                <label
                  v-for="level in allLevels"
                  :key="level"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    :value="level"
                    :checked="selectedLevels.includes(level)"
                    @change="toggleLevel(level)"
                    class="rounded text-blue-600"
                  />
                  <span>{{ level }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-semibold text-lg mb-3">Price Range</h3>
              <div class="space-y-4">
                <input
                  type="range"
                  v-model.number="priceRange[1]"
                  :min="0"
                  :max="1000"
                  step="10"
                  @change="updatePriceRange"
                  class="w-full"
                />
                <div class="flex justify-between">
                  <span>$0</span>
                  <span>${{ priceRange[1] }}</span>
                </div>
              </div>
            </div>

            <!-- Reset Filters -->
            <button
              @click="resetFilters"
              :disabled="!hasFilters"
              :class="{'opacity-50 cursor-not-allowed': !hasFilters}"
              class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="w-full lg:w-3/4">
          <!-- Sorting and Results Count -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6" data-aos="fade-left">
            <p class="text-gray-600 mb-2 sm:mb-0">
              Showing {{ paginatedCourses.length }} of {{ courseCount }} courses
              <span v-if="hasFilters" class="text-sm text-gray-500">(filtered)</span>
            </p>
            <div class="flex items-center">
              <span class="mr-2 text-gray-600">Sort by:</span>
              <select
                v-model="sortBy"
                @change="updateSort"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rated">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

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
          <div v-else-if="courseCount === 0" class="text-center py-12 bg-white rounded-lg shadow-sm">
            <p class="text-gray-600 text-lg">No courses match your filters.</p>
            <button
              @click="resetFilters"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>

          <!-- Courses Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="course in paginatedCourses"
              :key="course.id"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              data-aos="fade-up"
            >
              <div class="relative">
                <img
                  :src="course.image || '/placeholder-course.jpg'"
                  :alt="course.title"
                  class="w-full h-48 object-cover"
                />
                <div class="absolute top-2 right-2 flex space-x-2">
                  <span
                    v-if="course.isPopular"
                    class="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
                  >
                    Popular
                  </span>
                  <span
                    v-if="course.isFeatured"
                    class="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
                  >
                    Featured
                  </span>
                  <span
                    v-if="course.price === 0"
                    class="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
                  >
                    FREE
                  </span>
                </div>
              </div>
              <div class="p-4 flex-grow flex flex-col">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  <router-link
                    :to="'/courses/' + course.id"
                    class="hover:text-blue-600 transition-colors"
                  >
                    {{ course.title }}
                  </router-link>
                </h3>
                <p class="text-gray-600 text-sm mb-2">By {{ course.instructor || 'Unknown Instructor' }}</p>
                <p class="text-gray-700 text-sm mb-3 line-clamp-2">
                  {{ course.description || 'No description available' }}
                </p>
                
                <div class="mt-auto">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <div class="flex text-yellow-400 mr-1">
                        <span v-for="star in 5" :key="star">
                          <svg
                            class="w-4 h-4"
                            :class="{ 'text-gray-300': star > Math.round(course.rating || 0) }"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      </div>
                      <span class="text-gray-600 text-sm">
                        {{ (course.rating || 0).toFixed(1) }}
                      </span>
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
                      {{ course.duration || 'N/A' }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {{ course.students || 0 }} students
                    </span>
                  </div>

                  <router-link
                    :to="'/courses/' + course.id"
                    class="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Course
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1 && !loading" class="mt-8 flex justify-center" data-aos="fade-up">
            <nav class="flex items-center space-x-2">
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Previous
              </button>
              
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="{ 'bg-blue-600 text-white border-blue-600': currentPage === page }"
                class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                {{ page }}
              </button>
              
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from '@/components/Courses/HeroSection.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  components: {
    HeroSection,
  },
  name: 'CourseListing',
  
  data() {
    return {
      debounceTimer: null
    }
  },
  
  computed: {
    ...mapState('courses', [
      'loading',
      'error',
      'searchQuery',
      'selectedCategories',
      'selectedLevels',
      'priceRange',
      'sortBy',
      'currentPage'
    ]),
    
    ...mapGetters('courses', [
      'paginatedCourses',
      'totalPages',
      'allCategories',
      'allLevels',
      'courseCount',
      'hasFilters'
    ]),
    
    visiblePages() {
      const range = 2
      let start = Math.max(1, this.currentPage - range)
      let end = Math.min(this.totalPages, start + range * 2)
      
      if (end === this.totalPages) {
        start = Math.max(1, end - range * 2)
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }
  },
  
  methods: {
    ...mapActions('courses', [
      'fetchCourses',
      'updateSearchQuery',
      'updateSelectedCategories',
      'updateSelectedLevels',
      'updatePriceRange',
      'updateSortBy',
      'changePage',
      'resetFilters'
    ]),
    
    handleSearchInput(e) {
      // Simple debounce implementation
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.updateSearchQuery(e.target.value)
      }, 300)
    },
    
    toggleCategory(category) {
      const newCategories = this.selectedCategories.includes(category)
        ? this.selectedCategories.filter(c => c !== category)
        : [...this.selectedCategories, category]
      this.updateSelectedCategories(newCategories)
    },
    
    toggleLevel(level) {
      const newLevels = this.selectedLevels.includes(level)
        ? this.selectedLevels.filter(l => l !== level)
        : [...this.selectedLevels, level]
      this.updateSelectedLevels(newLevels)
    },
    
    updateSort(e) {
      this.updateSortBy(e.target.value)
    },
    
    updatePriceRange() {
      this.updatePriceRange([0, this.priceRange[1]])
    }
  },
  
  created() {
    this.fetchCourses()
  },
  
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 10,
      delay: 100
    })
  },
  
  beforeDestroy() {
    clearTimeout(this.debounceTimer)
  }
}
</script>

<style scoped>
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

/* Sticky sidebar */
.sticky {
  position: -webkit-sticky;
  position: sticky;
}

/* Course card hover effect */
.course-card {
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>