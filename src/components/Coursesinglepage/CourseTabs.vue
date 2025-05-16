<template>
  <div class="course-tabs">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs" :key="tab.id">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === tab.id }"
          @click="$emit('tab-change', tab.id)"
        >
          {{ tab.label }}
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
    }
  },
  data() {
    return {
      tabs: [
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
.nav-tabs {
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 5px;
}

.nav-item {
  margin-bottom: -1px;
}

.nav-link {
  padding: 12px 20px;
  border: none;
  background: none;
  color: #555;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.nav-link:hover {
  color: #4e6bff;
  border-bottom-color: #e0e0e0;
}

.nav-link.active {
  color: #4e6bff;
  border-bottom-color: #4e6bff;
}
</style>