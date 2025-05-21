<template>
  <div class="course-overview space-y-8 md:space-y-10">
    <!-- Course Description -->
    <div>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">About This Course</h2>
      <p class="text-gray-600 leading-relaxed text-lg">{{ description }}</p>
    </div>
    
    <!-- What You'll Learn -->
    <div class="what-you-learn">
      <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">What You'll Learn</h3>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        <li 
          v-for="(feature, index) in features" 
          :key="index"
          class="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          <i class="fas fa-check text-blue-500 mt-1 flex-shrink-0"></i>
          <span class="text-gray-700">{{ feature }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Course Features -->
    <div class="course-features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-8 border-t border-b border-gray-200">
      <div 
        v-for="(feature, index) in courseFeatures"
        :key="index"
        class="feature flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
      >
        <div class="p-3 bg-blue-100 rounded-lg text-blue-500">
          <i :class="feature.icon" class="text-xl"></i>
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{{ feature.title }}</h4>
          <p class="text-lg font-semibold text-gray-800">{{ feature.value || 'N/A' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseOverview',
  props: {
    description: { type: String, required: true },
    features: { type: Array, default: () => [] },
    duration: { type: String, default: '' },
    lessons: { type: [Number, String], default: '' },
    level: { type: String, default: '' }
  },
  computed: {
    courseFeatures() {
      return [
        { icon: 'fas fa-film', title: 'Duration', value: this.duration },
        { icon: 'fas fa-book', title: 'Lessons', value: this.lessons },
        { icon: 'fas fa-signal', title: 'Level', value: this.level }
      ]
    }
  }
}
</script>

<style scoped>
/* Animation for feature items */
.feature {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-2px);
}

/* Pulse animation for check icons */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.what-you-learn li:hover i {
  animation: pulse 0.5s ease;
}

/* Responsive adjustments for very small screens */
@media (max-width: 400px) {
  .what-you-learn ul {
    grid-template-columns: 1fr;
  }
}
</style>