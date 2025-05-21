<template>
  <div class="course-tabs">
    <ul class="nav-tabs flex overflow-x-auto whitespace-nowrap scrollbar-hide">
      <li 
        class="nav-item flex-shrink-0" 
        v-for="tab in tabs" 
        :key="tab.id"
      >
        <button 
          class="nav-link px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-medium relative transition-all duration-200"
          :class="{
            'text-blue-600': activeTab === tab.id,
            'text-gray-600 hover:text-gray-800': activeTab !== tab.id
          }"
          @click="$emit('tab-change', tab.id)"
        >
          {{ tab.label }}
          <span 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-200"
            :class="{
              'scale-x-100': activeTab === tab.id,
              'scale-x-0': activeTab !== tab.id
            }"
          ></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CourseTabs',
  props: {
    course: {
      type: Object,
      required: true
    },
    activeTab: {
      type: String,
      default: 'overview'
    },
    tabs: {
      type: Array,
      default: () => [
        { id: 'overview', label: 'Overview' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'instructor', label: 'Instructor' },
        { id: 'reviews', label: 'Reviews' }
      ]
    }
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-tabs {
  border-bottom: 1px solid #e5e7eb;
}

.nav-link {
  border-bottom: 2px solid transparent;
}

.nav-link:hover:not(.active) {
  border-bottom-color: #e5e7eb;
}
</style>