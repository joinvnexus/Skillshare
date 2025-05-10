<template>
  <div class="featured-courses-section">
    <h2 class="section-title" data-aos="fade-up" data-aos-duration="1000">Featured Courses</h2>
    <div class="course-cards-grid">
      <div
        v-for="(course, index) in featuredCourses"
        :key="course.id"
        class="course-card"
        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
        :data-aos-duration="1200"
        :data-aos-delay="index * 200"
      >
        <div class="course-badge" v-if="course.isFeatured">
          {{ course.badge }}
        </div>
        <img :src="course.image" alt="course thumbnail" class="course-thumbnail" />
        <div class="course-info">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-instructor">Instructor: {{ course.instructor }}</p>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-rating">
            <i class="fas fa-star" v-for="star in course.rating" :key="star"></i>
          </div>
          <p class="course-price">{{ course.price === 0 ? 'Free' : '$' + course.price }}</p>
          <router-link :to="'/courses/' + course.id" class="cta-btn">Learn More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'FeaturedCourses',
  data() {
    return {
      featuredCourses: [
        {
          id: 1,
          title: 'Mastering Vue.js',
          instructor: 'John Doe',
          description: 'Become a Vue.js expert with this comprehensive course.',
          rating: 5,
          price: 99,
          image: 'https://via.placeholder.com/150',
          isFeatured: true,
          badge: 'Top Course',
        },
        {
          id: 2,
          title: 'Advanced Vuex Techniques',
          instructor: 'Jane Smith',
          description: 'Master state management in Vue.js with Vuex.',
          rating: 4,
          price: 120,
          image: 'https://via.placeholder.com/150',
          isFeatured: true,
          badge: 'Special Offer',
        },
        // More featured courses...
      ],
    };
  },
  mounted() {
    AOS.init({
      duration: 1000, // Default duration for all animations
      delay: 0, // Default delay for all animations
      once: true, // Animation happens only once
    });
  },
};
</script>

<style scoped>
.featured-courses-section {
  background: #f5f5f5;
  padding: 50px 20px;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

.course-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: start;
}

.course-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.course-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

.course-instructor,
.course-description,
.course-price {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #777;
}

.course-rating i {
  color: #f39c12;
}

.course-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.cta-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.cta-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .course-thumbnail {
    height: 120px;
  }
}
</style>