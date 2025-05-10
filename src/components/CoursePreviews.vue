<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured <span class="text-blue-600">Courses</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn from industry experts with our top-rated courses
        </p>
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

      <!-- Courses Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(course, index) in featuredCourses" 
          :key="course.id"
          class="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
          @mouseenter="hoveredCourse = index"
          @mouseleave="hoveredCourse = null"
        >
          <!-- Course Image -->
          <div class="h-48 overflow-hidden">
            <img 
              :src="course.image" 
              :alt="course.title"
              class="w-full h-full object-cover transition-transform duration-500"
              :class="{'scale-105': hoveredCourse === index}"
            >
          </div>

          <!-- Course Content -->
          <div class="p-6 flex-grow">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
            <p class="text-gray-600 mb-1">By {{ course.instructor }}</p>
            <div class="flex items-center mb-3">
              <div class="flex text-yellow-400 mr-2">
                <span v-for="star in 5" :key="star">
                  <svg 
                    class="w-5 h-5" 
                    :class="{ 'text-gray-300': star > Math.round(course.rating) }" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <span class="text-gray-600">{{ course.rating }} ({{ course.students }} students)</span>
            </div>
            <p class="text-gray-600 mb-4">{{ course.description }}</p>
            <button 
              class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              @click="openQuickView(course)"
            >
              Learn More
            </button>
          </div>

          <!-- Quick View Overlay -->
          <div 
            class="absolute inset-0 bg-blue-600 bg-opacity-90 text-white flex flex-col justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            v-show="hoveredCourse === index"
          >
            <h3 class="text-xl font-semibold mb-4">{{ course.title }}</h3>
            <p class="mb-4">{{ course.descriptionExtended }}</p>
            <button 
              class="mt-auto px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
              @click="openQuickView(course)"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View Modal -->
    <div 
      v-if="selectedCourse" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeQuickView"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <img 
            :src="selectedCourse.image" 
            :alt="selectedCourse.title"
            class="w-full h-64 object-cover rounded-t-xl"
          >
          <button 
            class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            @click="closeQuickView"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedCourse.title }}</h2>
          <div class="flex flex-wrap gap-4 mb-4">
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ selectedCourse.instructor }}
            </div>
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ selectedCourse.duration }}
            </div>
            <div class="flex items-center text-gray-700">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ selectedCourse.lessons }} lessons
            </div>
          </div>
          
          <div class="flex items-center mb-6">
            <div class="flex text-yellow-400 mr-2">
              <span v-for="star in 5" :key="star">
                <svg 
                  class="w-6 h-6" 
                  :class="{ 'text-gray-300': star > Math.round(selectedCourse.rating) }" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </div>
            <span class="text-gray-700">{{ selectedCourse.rating }} ({{ selectedCourse.students }} students)</span>
          </div>
          
          <div class="prose max-w-none text-gray-700 mb-6">
            <p>{{ selectedCourse.fullDescription }}</p>
          </div>
          
          <button 
            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            @click="enrollCourse(selectedCourse)"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CoursePreviews',
  data() {
    return {
      hoveredCourse: null
    }
  },
  computed: {
    ...mapState('courses', ['loading', 'error', 'selectedCourse']),
    ...mapGetters('courses', ['featuredCourses'])
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    ...mapActions('courses', ['fetchCourses', 'openQuickView', 'closeQuickView']),
    enrollCourse(course) {
      // Implement enrollment logic
      console.log('Enrolling in:', course.title)
      this.closeQuickView()
      // In a real app, you might navigate to a checkout page or show a signup modal
    }
  }
}
</script>