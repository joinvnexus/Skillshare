// CourseDetail.vue
<template>
  <div class="course-detail">
    <h2>{{ course.title }}</h2>
    <img :src="course.image" alt="Course Image" />
    <p><strong>Instructor:</strong> {{ course.instructor }}</p>
    <p><strong>Description:</strong> {{ course.description }}</p>
    <p><strong>Rating:</strong> {{ course.rating }} ★</p>
    <p><strong>Price:</strong> {{ course.price > 0 ? `$${course.price}` : 'Free' }}</p>
    <button @click="enroll">Enroll Now</button>
  </div>
</template>

<script>
export default {
  name: 'CourseDetail',
  data() {
    return {
      course: null, // To store the selected course
    };
  },
  mounted() {
    const courseId = this.$route.params.id; // Get the dynamic course id from the route
    this.course = this.getCourseById(courseId); // Find the course by id
  },
  methods: {
    getCourseById(id) {
      // Mock fetching course data, replace with actual API or data fetching logic
      const courses = [
        { id: 1, title: 'Mastering Vue.js', instructor: 'John Doe', description: 'Become a Vue.js expert...', rating: 5, price: 99, image: 'https://via.placeholder.com/150' },
        // Add the rest of your courses here
      ];
      return courses.find(course => course.id == id);
    },
    enroll() {
      alert('You have enrolled in the course!');
    }
  }
};
</script>

<style scoped>
.course-detail {
  padding: 20px;
}
.course-detail img {
  max-width: 100%;
  height: auto;
}
</style>
