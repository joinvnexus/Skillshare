
## 9. RelatedCourses.vue

```vue
<template>
  <section class="related-courses" v-if="courses.length">
    <div class="container">
      <h2>Related Courses</h2>
      <p class="subtitle">You might also like these courses</p>
      
      <div class="courses-grid">
        <CourseCard 
          v-for="course in courses" 
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CourseCard from '@/components/Courses/CourseGrid.vue'

export default {
  name: 'RelatedCourses',
  components: {
    CourseCard
  },
  props: {
    courses: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.related-courses {
  padding: 60px 0;
  background: #f9f9f9;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>