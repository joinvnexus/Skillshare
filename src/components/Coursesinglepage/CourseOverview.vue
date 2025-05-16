<template>
  <div class="course-overview">
    <h2>About This Course</h2>
    <p>{{ description }}</p>
    
    <div class="what-you-learn">
      <h3>What You'll Learn</h3>
      <ul>
        <li v-for="(item, index) in features" :key="index">
          <i class="fas fa-check"></i> {{ item }}
        </li>
      </ul>
    </div>
    
    <div class="course-features">
      <div class="feature">
        <i class="fas fa-film"></i>
        <div>
          <h4>Duration</h4>
          <p>{{ course.duration }}</p>
        </div>
      </div>
      <div class="feature">
        <i class="fas fa-book"></i>
        <div>
          <h4>Lessons</h4>
          <p>{{ course.lessons }}</p>
        </div>
      </div>
      <div class="feature">
        <i class="fas fa-signal"></i>
        <div>
          <h4>Level</h4>
          <p>{{ course.level }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseOverview',
  props: {
    description: {
      type: String,
      required: true
    },
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      features: [
        'Master Vue.js fundamentals',
        'Build real-world applications',
        'Learn state management with Vuex',
        'Implement routing with Vue Router',
        'Create reusable components',
        'Understand best practices'
      ]
    }
  }
}
</script>

<style scoped>
.course-overview {
  line-height: 1.6;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.4rem;
  margin: 30px 0 15px;
}

.what-you-learn ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 30px;
  margin-bottom: 30px;
}

.what-you-learn li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.what-you-learn i {
  color: #4e6bff;
  margin-top: 3px;
}

.course-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 40px;
  padding: 30px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.feature {
  display: flex;
  gap: 15px;
}

.feature i {
  font-size: 1.5rem;
  color: #4e6bff;
}

.feature h4 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
}

.feature p {
  font-weight: 600;
  margin: 0;
}
</style>