<template>
  <div>
    <!-- Course Listings -->
    <section id="course-listings">
      <div class="container">
        <div class="row">
          <!-- Course Cards will be rendered here -->
          <div 
            v-for="course in courses" 
            :key="course.id" 
            class="col-md-4"
            data-aos="fade-up"  
            data-aos-duration="1000"
          >
            <div class="course-card">
              <img :src="course.image" alt="Course Image" />
              <h3>{{ course.title }}</h3>
              <p>Instructor: {{ course.instructor }}</p>
              <p>{{ course.description }}</p>
              <p>Rating: {{ course.rating }} ★</p>
              <p>Price: {{ course.price > 0 ? `$${course.price}` : 'Free' }}</p>
              <button @click="viewCourseDetails(course.id)">Learn More</button>
            </div>
          </div>
        </div>
        <div v-if="loading" class="text-center">
          <p>Loading more courses...</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AOS from 'aos';  // Import AOS for animation

export default {
  data() {
    return {
      courses: [
      { id: 1, title: 'Mastering Vue.js', instructor: 'John Doe', description: 'Become a Vue.js expert with this comprehensive course.', rating: 5, price: 99, image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Advanced Vuex Patterns', instructor: 'Jane Smith', description: 'Deep dive into Vuex for state management.', rating: 4, price: 79, image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Vue Router Essentials', instructor: 'Alice Johnson', description: 'Learn the essentials of routing in Vue.js.', rating: 4.5, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Vue.js for Beginners', instructor: 'Bob Brown', description: 'A beginner’s guide to Vue.js with hands-on examples.', rating: 4.8, price: 59, image: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Building SPAs with Vue.js', instructor: 'Carol White', description: 'Create single-page applications using Vue.js.', rating: 5, price: 109, image: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Vue.js with TypeScript', instructor: 'David Green', description: 'Combine Vue.js with TypeScript for robust applications.', rating: 4.6, price: 99, image: 'https://via.placeholder.com/150' },
        
        // Your existing courses array...
      ],
      loading: false,
      page: 1,
      perPage: 6,
      totalPages: 4,
    };
  },
  methods: {
    loadMoreCourses() {
      if (this.page < this.totalPages) {
        this.loading = true;
        setTimeout(() => {
          const newCourses = this.generateMoreCourses();
          this.courses = [...this.courses, ...newCourses];
          this.page += 1;
          this.loading = false;
          AOS.refresh();  // Refresh AOS after loading more content
        }, 1000);
      }
    },
    generateMoreCourses() {
      return [
         // Additional courses
         { id: 7, title: 'State Management with Pinia', instructor: 'Eva Adams', description: 'Explore state management using Pinia.', rating: 4.7, price: 79, image: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Vue.js Performance Optimization', instructor: 'Frank Miller', description: 'Optimize performance in Vue.js applications.', rating: 4.9, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Vue 3 Composition API', instructor: 'Grace Lee', description: 'Master the Composition API introduced in Vue 3.', rating: 5, price: 99, image: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Integrating Vue.js with REST APIs', instructor: 'Henry Martinez', description: 'Learn how to connect Vue.js applications with REST APIs.', rating: 4.8, price: 79, image: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Testing Vue.js Applications', instructor: 'Isabella Davis', description: 'Techniques and tools for testing Vue.js applications.', rating: 4.7, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Server-Side Rendering with Vue.js', instructor: 'Jack Wilson', description: 'Implement server-side rendering in Vue.js.', rating: 4.6, price: 99, image: 'https://via.placeholder.com/150' },
        { id: 13, title: 'Vue.js Component Design Patterns', instructor: 'Karen Brown', description: 'Design reusable and maintainable Vue.js components.', rating: 4.9, price: 109, image: 'https://via.placeholder.com/150' },
        { id: 14, title: 'Vue.js and GraphQL', instructor: 'Leo Harris', description: 'Integrate Vue.js with GraphQL for efficient data queries.', rating: 4.8, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 15, title: 'Vue.js Animations and Transitions', instructor: 'Mia Clark', description: 'Enhance user experience with animations and transitions in Vue.js.', rating: 4.7, price: 79, image: 'https://via.placeholder.com/150' },
        { id: 16, title: 'Building Progressive Web Apps with Vue.js', instructor: 'Noah Walker', description: 'Create progressive web apps using Vue.js.', rating: 4.8, price: 99, image: 'https://via.placeholder.com/150' },
        { id: 17, title: 'Vue.js and Firebase', instructor: 'Olivia Lewis', description: 'Leverage Firebase services in your Vue.js projects.', rating: 4.6, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 18, title: 'Custom Vue.js Directives', instructor: 'Paul Young', description: 'Build and use custom directives in Vue.js.', rating: 4.7, price: 79, image: 'https://via.placeholder.com/150' },
        { id: 19, title: 'Vue.js Internationalization', instructor: 'Quinn King', description: 'Add multi-language support to Vue.js applications.', rating: 4.8, price: 89, image: 'https://via.placeholder.com/150' },
        { id: 20, title: 'Advanced Vue.js Patterns', instructor: 'Rachel Scott', description: 'Explore advanced design patterns in Vue.js.', rating: 5, price: 109, image: 'https://via.placeholder.com/150' },
        // Additional course data here...
      ];
    },
    viewCourseDetails(courseId) {
      this.$router.push({ name: 'CourseDetail', params: { id: courseId } });
    }
  },
  mounted() {
    AOS.init({ duration: 1000 });  // Initialize AOS with custom duration
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop + windowHeight >= documentHeight) {
        this.loadMoreCourses();
      }
    }
  }
};
</script>
<style scoped>
#course-listings {
  padding: 40px;
  background: #e6f8f7;
  color: #000;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
}

.course-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.course-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.course-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.course-card p {
  font-size: 14px;
  margin-bottom: 8px;
}

.course-card button {
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.course-card button:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>