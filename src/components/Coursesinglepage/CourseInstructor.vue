<template>
  <div class="course-instructor">
    <h2>About the Instructor</h2>
    
    <div class="instructor-profile">
      <div class="avatar">
        <img :src="instructorImage" :alt="instructor">
      </div>
      <div class="details">
        <h3>{{ instructor }}</h3>
        <div class="rating">
          <i v-for="i in 5" :key="i" class="fas fa-star filled"></i>
          <span>4.9 Instructor Rating</span>
        </div>
        <div class="stats">
          <div class="stat">
            <strong>12,540</strong> Students
          </div>
          <div class="stat">
            <strong>8</strong> Courses
          </div>
          <div class="stat">
            <strong>3,256</strong> Reviews
          </div>
        </div>
        <p class="bio">
          {{ instructor }} is a professional web developer with over 10 years of experience building applications with Vue.js. 
          He has worked with companies like Google, Microsoft, and Netflix to build scalable frontend architectures.
        </p>
      </div>
    </div>
    
    <div class="other-courses" v-if="otherCourses.length">
      <h3>Other Courses by {{ instructor }}</h3>
      <div class="courses-grid">
        <div class="course-card" v-for="course in otherCourses" :key="course.id">
          <img :src="course.image" :alt="course.title">
          <h4>{{ course.title }}</h4>
          <div class="meta">
            <span class="rating">
              <i class="fas fa-star filled"></i> {{ course.rating.toFixed(1) }}
            </span>
            <span class="price">${{ course.price }}</span>
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
    instructor: {
      type: String,
      required: true
    },
    otherCourses: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    instructorImage() {
      // This would normally come from the instructor data
      const name = this.instructor.toLowerCase().replace(/\s+/g, '-')
      return `/images/instructors/${name}.jpg`
    }
  }
}
</script>

<style scoped>
.course-instructor h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.instructor-profile {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.avatar {
  flex: 0 0 150px;
}

.avatar img {
  width: 100%;
  border-radius: 50%;
}

.details {
  flex: 1;
}

.details h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rating i {
  color: #ffc107;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat strong {
  font-size: 1.2rem;
  color: #4e6bff;
}

.bio {
  line-height: 1.6;
  color: #555;
}

.other-courses h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.course-card {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.course-card h4 {
  padding: 15px;
  margin: 0;
  font-size: 1rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  padding: 0 15px 15px;
}

.rating {
  color: #ffc107;
  font-weight: 600;
}

.price {
  font-weight: 600;
  color: #4e6bff;
}
</style>