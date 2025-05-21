<template>
  <div class="course-instructor space-y-8 md:space-y-12">
    <!-- Section Title -->
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800">About the Instructor</h2>
    
    <!-- Instructor Profile -->
    <div class="instructor-profile flex flex-col md:flex-row gap-6 md:gap-8">
      <!-- Avatar -->
      <div class="avatar flex-shrink-0 w-32 h-32 md:w-40 md:h-40">
        <img 
          :src="instructorImage" 
          :alt="instructor"
          class="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
        >
      </div>
      
      <!-- Details -->
      <div class="details flex-1 space-y-4">
        <div>
          <h3 class="text-xl md:text-2xl font-bold text-gray-800">{{ instructor }}</h3>
          <div class="rating flex items-center gap-2 mt-1">
            <div class="flex text-yellow-400">
              <i v-for="i in 5" :key="i" class="fas fa-star"></i>
            </div>
            <span class="text-gray-600">4.9 Instructor Rating</span>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="stats flex flex-wrap gap-4 md:gap-6">
          <div class="stat">
            <strong class="block text-blue-600 text-xl font-bold">{{ students || '12,540' }}</strong>
            <span class="text-gray-500 text-sm">Students</span>
          </div>
          <div class="stat">
            <strong class="block text-blue-600 text-xl font-bold">{{ coursesCount || '8' }}</strong>
            <span class="text-gray-500 text-sm">Courses</span>
          </div>
          <div class="stat">
            <strong class="block text-blue-600 text-xl font-bold">{{ reviews || '3,256' }}</strong>
            <span class="text-gray-500 text-sm">Reviews</span>
          </div>
        </div>
        
        <!-- Bio -->
        <p class="bio text-gray-600 leading-relaxed">
          {{ instructor }} {{ bio || 'has not provided a bio.' }}
        </p>
      </div>
    </div>
    
    <!-- Other Courses -->
    <div class="other-courses" v-if="otherCourses.length">
      <h3 class="text-xl md:text-2xl font-bold text-gray-800 pb-3 border-b border-gray-200 mb-6">
        Other Courses by {{ instructor }}
      </h3>
      
      <div class="courses-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="course in otherCourses" 
          :key="course.id"
          class="course-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <img 
            :src="course.image" 
            :alt="course.title"
            class="w-full h-40 object-cover"
          >
          <div class="p-4 space-y-2">
            <h4 class="font-semibold text-gray-800 line-clamp-2">{{ course.title }}</h4>
            <div class="meta flex justify-between items-center pt-2">
              <span class="rating flex items-center gap-1 text-yellow-500 font-medium">
                <i class="fas fa-star"></i>
                <span>{{ course.rating.toFixed(1) }}</span>
              </span>
              <span class="price text-blue-600 font-bold">${{ course.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseInstructor',
  props: {
    instructor: { type: String, required: true },
    otherCourses: { type: Array, default: () => [] },
    students: { type: [Number, String], default: '' },
    coursesCount: { type: [Number, String], default: '' },
    reviews: { type: [Number, String], default: '' },
    bio: { type: String, default: '' }
  },
  computed: {
    instructorImage() {
      const name = this.instructor.toLowerCase().replace(/\s+/g, '-')
      return `/images/instructors/${name}.jpg`
    }
  }
}
</script>

<style scoped>
/* Animation for course cards */
.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Pulse animation for stars */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.rating:hover i {
  animation: pulse 0.5s ease;
}

/* Responsive adjustments for very small screens */
@media (max-width: 400px) {
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>