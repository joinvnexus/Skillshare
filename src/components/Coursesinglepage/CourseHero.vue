<template>
  <section class="course-hero" :style="{ backgroundImage: `url(${course.image})` }">
    <div class="overlay"></div>
    <div class="container">
      <div class="hero-content">
        <div class="breadcrumbs">
          <router-link to="/courses">Courses</router-link> / {{ course.category }}
        </div>
        <h1>{{ course.title }}</h1>
        <div class="meta">
          <div class="rating">
            <span class="stars">
              <i v-for="i in 5" :key="i" :class="['fas fa-star', { 'filled': i <= Math.round(course.rating) }]"></i>
            </span>
            <span>({{ course.rating.toFixed(1) }})</span>
          </div>
          <div class="students">
            <i class="fas fa-users"></i> {{ course.students.toLocaleString() }} students
          </div>
          <div class="level">
            <i class="fas fa-signal"></i> {{ course.level }}
          </div>
        </div>
        <p class="description">{{ course.descriptionExtended }}</p>
        <div class="actions">
          <button class="btn btn-primary" @click="$emit('enroll')">
            Enroll Now for ${{ course.price }}
          </button>
          <button class="btn btn-outline">
            <i class="far fa-heart"></i> Add to Wishlist
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
    }
  }
}
</script>

<style scoped>
.course-hero {
  position: relative;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  display: flex;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.breadcrumbs {
  margin-bottom: 15px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.breadcrumbs a {
  color: white;
  text-decoration: none;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.meta {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.meta i {
  margin-right: 5px;
}

.stars {
  display: inline-block;
  margin-right: 5px;
}

.stars .filled {
  color: #ffc107;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #4e6bff;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #3a56d4;
}

.btn-outline {
  background: transparent;
  border: 1px solid white;
  color: white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>