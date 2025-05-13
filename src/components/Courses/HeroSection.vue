<template>
  <div class="relative overflow-hidden">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 opacity-95"></div>
    
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div class="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div class="text-center">
        <!-- Animated Title -->
        <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          <span class="block">Unlock Your</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
            Learning Potential
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-blue-100">
          Discover the perfect course to advance your career, master new skills, or explore your passions.
        </p>

        <!-- Search Bar -->
        <div class="mt-10 max-w-md mx-auto">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              v-model="searchQuery"
              @input="handleSearch"
              class="block w-full pl-10 pr-4 py-4 border border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Search courses, topics, or instructors..."
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <button 
                @click="handleSearch"
                class="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Categories -->
        <div class="mt-12">
          <h3 class="text-sm font-semibold text-blue-200 tracking-wide uppercase mb-4">
            Popular Categories
          </h3>
          <div class="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            <button
              v-for="category in popularCategories"
              :key="category"
              @click="filterByCategory(category)"
              class="px-4 py-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium hover:bg-opacity-20 transition-all duration-200 border border-white border-opacity-20"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white mb-2">
              {{ stat.value }}+
            </div>
            <div class="text-sm font-medium text-blue-100 uppercase tracking-wider">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Divider -->
    <div class="relative">
      <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-600 to-transparent"></div>
      <svg class="w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="fill-current text-blue-600"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="fill-current text-blue-600"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="fill-current text-white"></path>
      </svg>
    </div>
  </div>

  <!-- Course Listing Section -->
  <div class="bg-gray-50 py-12">
    <!-- Your existing course listing grid goes here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      popularCategories: [
        'Web Development',
        'Data Science',
        'Mobile Apps',
        'UI/UX Design',
        'Business',
        'Photography'
      ],
      stats: [
        { value: '10,000', label: 'Students' },
        { value: '500', label: 'Courses' },
        { value: '200', label: 'Instructors' },
        { value: '98', label: 'Satisfaction' }
      ]
    }
  },
  methods: {
    handleSearch() {
      // Implement search functionality
      this.$store.dispatch('courses/updateSearchQuery', this.searchQuery)
    },
    filterByCategory(category) {
      // Implement category filter
      this.$store.dispatch('courses/updateSelectedCategories', [category])
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.floating-element {
  animation: float 6s ease-in-out infinite;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Backdrop blur effect (for browsers that support it) */
.backdrop-filter {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
</style>