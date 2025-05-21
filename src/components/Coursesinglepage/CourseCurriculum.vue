<template>
  <div class="course-curriculum space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Course Curriculum</h2>
      <p class="text-gray-600">{{ lessons }} lessons • {{ duration }}</p>
    </div>

    <!-- Accordion -->
    <div class="accordion border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div 
        class="accordion-item border-b border-gray-200 last:border-b-0"
        v-for="(section, index) in sections" 
        :key="index"
      >
        <!-- Accordion Header -->
        <button
          class="accordion-header w-full px-4 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-left transition-colors duration-200"
          :class="{
            'bg-blue-600 text-white': activeSection === index,
            'bg-gray-50 hover:bg-gray-100': activeSection !== index
          }"
          @click="toggleSection(index)"
        >
          <div class="section-title flex items-center gap-3">
            <i 
              class="fas text-sm transition-transform duration-300"
              :class="{
                'fa-minus': activeSection === index,
                'fa-plus': activeSection !== index,
                'text-white': activeSection === index,
                'text-gray-500': activeSection !== index
              }"
            ></i>
            <span class="font-medium">{{ section.title }}</span>
          </div>
          <div 
            class="section-meta text-sm"
            :class="{
              'text-blue-100': activeSection === index,
              'text-gray-500': activeSection !== index
            }"
          >
            {{ section.lessons.length }} lessons • {{ section.duration }}
          </div>
        </button>
        
        <!-- Accordion Content -->
        <div 
          class="accordion-content bg-white overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-0': activeSection !== index,
            'max-h-[1000px]': activeSection === index
          }"
        >
          <ul class="px-4 py-2 md:px-6 md:py-3 space-y-3">
            <li 
              v-for="(lesson, lessonIndex) in section.lessons" 
              :key="lessonIndex"
              class="lesson py-3 border-b border-gray-100 last:border-b-0 flex items-center gap-4 hover:bg-gray-50 px-2 rounded transition-colors duration-150"
            >
              <i 
                class="far flex-shrink-0 text-lg"
                :class="{
                  'fa-play-circle text-blue-500': lesson.type === 'video',
                  'fa-file-alt text-green-500': lesson.type !== 'video'
                }"
              ></i>
              <span class="flex-1 text-gray-700">{{ lesson.title }}</span>
              <span class="duration text-sm text-gray-500">{{ lesson.duration }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCurriculum',
  props: {
    lessons: {
      type: [Number, String],
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    sections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeSection: 0
    }
  },
  methods: {
    toggleSection(index) {
      this.activeSection = this.activeSection === index ? null : index
    }
  }
}
</script>

<style scoped>
/* Smooth accordion animation */
.accordion-content {
  transition: max-height 0.3s ease-in-out;
}

/* Pulse animation for plus/minus icons */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.accordion-header:hover .fa-plus,
.accordion-header:hover .fa-minus {
  animation: pulse 0.5s ease;
}

/* Responsive adjustments */
@media (max-width: 400px) {
  .lesson {
    flex-wrap: wrap;
    gap: 2px;
    padding-bottom: 12px;
  }
  
  .duration {
    margin-left: auto;
  }
}
</style>