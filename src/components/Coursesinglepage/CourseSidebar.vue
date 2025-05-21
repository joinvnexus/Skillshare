<template>
  <div class="sticky top-5 space-y-6">
    <!-- Course Details Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800">Course Details</h3>
      </div>
      <div class="p-5">
        <ul class="space-y-3">
          <li v-for="(item, index) in metaItems" :key="index" class="flex items-center py-2 border-b border-gray-100 last:border-0">
            <i :class="item.icon" class="w-5 text-blue-500 mr-3"></i>
            <span class="text-gray-600">{{ item.label }}: <strong class="text-gray-800">{{ item.value }}</strong></span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Price Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden text-center">
      <div class="p-5">
        <div class="flex justify-center items-baseline mb-4">
          <span class="text-3xl font-bold text-blue-500">${{ course.price }}</span>
          <span v-if="course.originalPrice" class="ml-2 text-lg text-gray-400 line-through">${{ course.originalPrice }}</span>
        </div>
        <button 
          @click="$emit('enroll')"
          class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
        >
          Enroll Now
        </button>
        <p class="mt-3 text-sm text-gray-500">30-Day Money-Back Guarantee</p>
      </div>
      
      <div class="px-5 py-4 border-t border-gray-100 text-left">
        <h4 class="text-base font-medium text-gray-800 mb-3">This course includes:</h4>
        <ul class="space-y-2">
          <li v-for="(feature, index) in courseFeatures" :key="index" class="flex items-start">
            <i :class="feature.icon" class="w-5 text-blue-500 mr-2 mt-0.5"></i>
            <span class="text-sm text-gray-600">{{ feature.text }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Share Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden p-5">
      <h4 class="text-base font-medium text-gray-800 mb-3">Share this course</h4>
      <div class="flex justify-between">
        <a 
          v-for="social in socialLinks" 
          :key="social.name"
          :href="social.href" 
          :class="`bg-${social.color}-500 hover:bg-${social.color}-600`"
          class="w-10 h-10 flex items-center justify-center rounded-full text-white transition duration-200 transform hover:-translate-y-1"
          aria-label="Share on Facebook"
        >
          <i :class="social.icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CourseSidebar',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const metaItems = computed(() => [
      { icon: 'fas fa-clock', label: 'Duration', value: props.course.duration },
      { icon: 'fas fa-book', label: 'Lessons', value: props.course.lessons },
      { icon: 'fas fa-signal', label: 'Level', value: props.course.level },
      { icon: 'fas fa-language', label: 'Language', value: props.course.Language || 'N/A' },
      { icon: 'fas fa-certificate', label: 'Certificate', value: props.course.certificate ? 'Yes' : 'No' }
    ])

    const courseFeatures = computed(() => [
      { icon: 'fas fa-video', text: `${props.course.duration} on-demand video` },
      { icon: 'fas fa-file-alt', text: `${props.course.lessons} downloadable resources` },
      { icon: 'fas fa-mobile-alt', text: 'Access on mobile and TV' },
      { icon: 'fas fa-infinity', text: 'Full lifetime access' },
      { icon: 'fas fa-trophy', text: 'Certificate of completion' }
    ])

    const socialLinks = [
      { name: 'facebook', icon: 'fab fa-facebook-f', color: 'blue', href: '#' },
      { name: 'twitter', icon: 'fab fa-twitter-t', color: 'sky', href: '#' },
      { name: 'linkedin', icon: 'fab fa-linkedin-in', color: 'indigo', href: '#' },
      { name: 'whatsapp', icon: 'fab fa-whatsapp', color: 'emerald', href: '#' }
    ]

    return { metaItems, courseFeatures, socialLinks }
  }
}
</script>