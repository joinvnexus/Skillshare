<template>
  <section 
    class="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center bg-cover bg-center text-white py-16 px-4 sm:px-6"
    :style="{ backgroundImage: `url(${course.image})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60"></div>
    
    <div class="container mx-auto relative z-10">
      <div class="max-w-3xl">
        <!-- Breadcrumbs -->
        <div class="text-sm md:text-base mb-4 text-white/80">
          <router-link 
            to="/courses" 
            class="text-white hover:text-blue-300 transition-colors duration-200"
          >
            Courses
          </router-link> 
          <span class="mx-1">/</span> 
          <span>{{ course.title }}</span>
        </div>
        
        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {{ course.title }}
        </h1>
        
        <!-- Meta Info -->
        <div class="flex flex-wrap gap-4 md:gap-6 mb-6 text-sm md:text-base">
          <!-- Rating -->
          <div class="flex items-center">
            <div class="flex mr-1 text-yellow-400">
              <i 
                v-for="i in 5" 
                :key="i" 
                class="fas fa-star"
                :class="{ 'text-gray-300': i > Math.round(course.rating) }"
              ></i>
            </div>
            <span>({{ course.rating.toFixed(1) }})</span>
          </div>
          
          <!-- Students -->
          <div class="flex items-center">
            <i class="fas fa-users mr-1.5"></i>
            <span>{{ course.students.toLocaleString() }} students</span>
          </div>
          
          <!-- Level -->
          <div class="flex items-center">
            <i class="fas fa-signal mr-1.5"></i>
            <span>{{ course.level }}</span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-lg md:text-xl mb-8 leading-relaxed">
          {{ course.descriptionExtended }}
        </p>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="$emit('enroll')"
            class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
          >
            Enroll Now for ${{ course.price }}
          </button>
          
          <button 
            class="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i class="far fa-heart"></i>
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CourseHero',
  props: {
    course: {
      type: Object,
      required: true
    },
    description: { type: String, required: true },
    features: { type: Array, default: () => [] },
    duration: { type: String, default: '' }
  }
}
</script>

<style scoped>
/* Animation for buttons */
button {
  transition: all 0.3s ease;
}

/* Pulse animation for primary button */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(78, 107, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(78, 107, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(78, 107, 255, 0); }
}

/* Apply pulse animation on hover */
button:first-child:hover {
  animation: pulse 1.5s infinite;
}

/* Responsive adjustments for very small screens */
@media (max-width: 400px) {
  .course-hero {
    min-height: 450px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  button {
    width: 100%;
    padding: 0.75rem();
  }
}
</style>