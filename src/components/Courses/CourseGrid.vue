<template>
  <div id="course-listing" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="course in courses"
      :key="course.id"
      class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col course-card"
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
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.course-card {
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
