<template>
  <div class="course-curriculum">
    <h2>Course Curriculum</h2>
    <p>{{ lessons }} lessons • {{ duration }}</p>
    
    <div class="accordion">
      <div class="accordion-item" v-for="(section, index) in sections" :key="index">
        <button 
          class="accordion-header"
          :class="{ active: activeSection === index }"
          @click="toggleSection(index)"
        >
          <div class="section-title">
            <i class="fas" :class="activeSection === index ? 'fa-minus' : 'fa-plus'"></i>
            <span>{{ section.title }}</span>
          </div>
          <div class="section-meta">
            <span>{{ section.lessons.length }} lessons • {{ section.duration }}</span>
          </div>
        </button>
        
        <div class="accordion-content" v-show="activeSection === index">
          <ul>
            <li v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex">
              <div class="lesson">
                <i class="far" :class="lesson.type === 'video' ? 'fa-play-circle' : 'fa-file-alt'"></i>
                <span>{{ lesson.title }}</span>
                <span class="duration">{{ lesson.duration }}</span>
              </div>
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
    }
  },
  data() {
    return {
      activeSection: 0,
      sections: [
        {
          title: 'Getting Started with Vue.js',
          duration: '2 hours',
          lessons: [
            { title: 'Introduction to Vue.js', duration: '15 min', type: 'video' },
            { title: 'Setting Up Your Environment', duration: '20 min', type: 'video' },
            { title: 'Vue Instance and Data Binding', duration: '25 min', type: 'video' },
            { title: 'Exercise: Your First Vue App', duration: '30 min', type: 'file' },
            { title: 'Quiz: Vue Basics', duration: '10 min', type: 'file' }
          ]
        },
        {
          title: 'Components and Templates',
          duration: '3 hours',
          lessons: [
            { title: 'Understanding Components', duration: '20 min', type: 'video' },
            { title: 'Component Communication', duration: '25 min', type: 'video' },
            { title: 'Slots and Dynamic Components', duration: '30 min', type: 'video' },
            { title: 'Exercise: Building a Component Library', duration: '45 min', type: 'file' }
          ]
        },
        {
          title: 'State Management with Vuex',
          duration: '4 hours',
          lessons: [
            { title: 'Introduction to State Management', duration: '20 min', type: 'video' },
            { title: 'Vuex Core Concepts', duration: '30 min', type: 'video' },
            { title: 'Modules and Namespacing', duration: '25 min', type: 'video' },
            { title: 'Exercise: Implementing Vuex', duration: '1 hour', type: 'file' }
          ]
        }
      ]
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
.course-curriculum h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.course-curriculum > p {
  color: #666;
  margin-bottom: 30px;
}

.accordion {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e0e0e0;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 15px 20px;
  background: #f9f9f9;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.accordion-header:hover {
  background: #f0f0f0;
}

.accordion-header.active {
  background: #4e6bff;
  color: white;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-meta {
  font-size: 0.9rem;
}

.accordion-content {
  padding: 20px;
  background: white;
}

.accordion-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.accordion-content li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.accordion-content li:last-child {
  border-bottom: none;
}

.lesson {
  display: flex;
  align-items: center;
  gap: 15px;
}

.lesson i {
  width: 20px;
  color: #666;
}

.lesson span {
  flex: 1;
}

.duration {
  color: #666;
  font-size: 0.9rem;
}
</style>