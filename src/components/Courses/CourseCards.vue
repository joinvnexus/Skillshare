<template>
  <div class="course-page">
    <!-- Search Bar Section -->
    <section class="search-bar-section" data-aos="fade-in">
      <input v-model="searchQuery" type="text" placeholder="Search for courses by title or keyword"
        class="search-input" />
      <button class="search-btn" @click="filterCourses">
        <i class="fas fa-search"></i> Search
      </button>
    </section>

    <!-- Filters Section -->
    <section class="filters-section" data-aos="fade-up">
      <div class="filter-category">
        <h4>Categories</h4>
        <div class="checkbox-group">
          <label><input type="checkbox" v-model="selectedCategories" value="Fundamentals" /> Fundamentals</label>
          <label><input type="checkbox" v-model="selectedCategories" value="Advanced" /> Advanced</label>
          <label><input type="checkbox" v-model="selectedCategories" value="Vuex" /> Vuex</label>
          <label><input type="checkbox" v-model="selectedCategories" value="Vue Router" /> Vue Router</label>
        </div>
      </div>

      <div class="filter-difficulty">
        <h4>Difficulty Levels</h4>
        <div class="radio-group">
          <label><input type="radio" v-model="selectedDifficulty" value="Beginner" /> Beginner</label>
          <label><input type="radio" v-model="selectedDifficulty" value="Intermediate" /> Intermediate</label>
          <label><input type="radio" v-model="selectedDifficulty" value="Advanced" /> Advanced</label>
        </div>
      </div>

      <div class="filter-price">
        <h4>Price Range</h4>
        <input type="range" class="price-slider" v-model="priceRange" min="0" max="1000" step="10"
          @change="filterCourses" />
        <span>Price: ${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
      </div>

      <div class="sort-by">
        <h4>Sort By</h4>
        <select v-model="sortBy" @change="sortCourses">
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="rated">Highest Rated</option>
        </select>
      </div>
    </section>

    <!-- Course Listings Section -->
    <section class="course-listings-section" data-aos="fade-in">
      <h2 class="section-title">Available Courses</h2>
      <div class="course-listing-grid">
        <div v-for="course in filteredCourses" :key="course.id" class="course-card" data-aos="fade-up">
          <img :src="course.image" alt="course thumbnail" class="course-thumbnail" />
          <h3 class="course-title">
            <router-link :to="'/courses/' + course.id">{{ course.title }}</router-link>
          </h3>
          <p class="course-instructor">Instructor: {{ course.instructor }}</p>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-rating">
            <i class="fas fa-star" v-for="star in course.rating" :key="star"></i>
          </div>
          <p class="course-price">{{ course.price === 0 ? 'Free' : '$' + course.price }}</p>
          <router-link :to="'/courses/' + course.id" class="cta-btn">Learn More</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'CourseCards',
  data() {
    return {
      searchQuery: '',
      selectedCategories: [],
      selectedDifficulty: '',
      priceRange: [0, 1000],
      sortBy: 'newest',
      courses: [
        {
          id: 1,
          title: 'Vue.js Fundamentals',
          instructor: 'John Doe',
          description: 'Learn the basics of Vue.js step by step.',
          rating: 4,
          price: 99,
          image: 'https://via.placeholder.com/150',
          category: 'Fundamentals',
          difficulty: 'Beginner',
        },
        {
          id: 2,
          title: 'Advanced Vue.js Concepts',
          instructor: 'Jane Smith',
          description: 'Dive deeper into Vue.js and learn advanced techniques.',
          rating: 5,
          price: 150,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Advanced',
        },
        {
          id: 2,
          title: 'Advanced Vue.js Concepts',
          instructor: 'Jane Smith',
          description: 'Dive deeper into Vue.js and learn advanced techniques.',
          rating: 5,
          price: 150,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Advanced',
        },
        {
          id: 3,
          title: 'Mastering Vuex',
          instructor: 'Michael Brown',
          description: 'Master state management with Vuex in complex applications.',
          rating: 5,
          price: 200,
          image: 'https://via.placeholder.com/150',
          category: 'Vuex',
          difficulty: 'Intermediate',
        },
        {
          id: 4,
          title: 'Vue Router: From Basics to Advanced',
          instructor: 'Emma Wilson',
          description: 'Learn how to navigate and structure your Vue.js apps with Vue Router.',
          rating: 4,
          price: 125,
          image: 'https://via.placeholder.com/150',
          category: 'Vue Router',
          difficulty: 'Intermediate',
        },
        {
          id: 5,
          title: 'Building Single Page Applications with Vue.js',
          instructor: 'Sophia Green',
          description: 'Create powerful SPAs using the best practices in Vue.js.',
          rating: 5,
          price: 175,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Advanced',
        },
        {
          id: 6,
          title: 'Vue.js and REST APIs',
          instructor: 'Chris Lee',
          description: 'Learn how to integrate Vue.js with RESTful APIs to build dynamic apps.',
          rating: 4,
          price: 120,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Intermediate',
        },
        {
          id: 7,
          title: 'Creating Reusable Components in Vue.js',
          instructor: 'Olivia White',
          description: 'Build and organize reusable components for efficient development.',
          rating: 4,
          price: 140,
          image: 'https://via.placeholder.com/150',
          category: 'Fundamentals',
          difficulty: 'Beginner',
        },
        {
          id: 8,
          title: 'Testing Vue.js Applications',
          instructor: 'Liam Johnson',
          description: 'Master testing techniques for Vue.js apps, from unit tests to end-to-end testing.',
          rating: 5,
          price: 160,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Advanced',
        },
        {
          id: 9,
          title: 'Vue.js Animations and Transitions',
          instructor: 'Emily Davis',
          description: 'Add beautiful animations and transitions to your Vue.js applications.',
          rating: 4,
          price: 110,
          image: 'https://via.placeholder.com/150',
          category: 'Fundamentals',
          difficulty: 'Intermediate',
        },
        {
          id: 10,
          title: 'Fullstack Vue.js with Node.js and Express',
          instructor: 'David Harris',
          description: 'Build fullstack applications using Vue.js, Node.js, and Express.',
          rating: 5,
          price: 250,
          image: 'https://via.placeholder.com/150',
          category: 'Advanced',
          difficulty: 'Advanced',
        }
      ],
    };
  },
  computed: {
    filteredCourses() {
      let filtered = this.courses;

      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Filter by selected categories
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter((course) =>
          this.selectedCategories.includes(course.category)
        );
      }

      // Filter by difficulty
      if (this.selectedDifficulty) {
        filtered = filtered.filter((course) => course.difficulty === this.selectedDifficulty);
      }

      // Filter by price range
      filtered = filtered.filter((course) => course.price >= this.priceRange[0] && course.price <= this.priceRange[1]);

      return filtered;
    },
  },
  methods: {


    filterCourses() {
      // This will recompute filtered courses based on the filters
      this.sortCourses();

    },
    sortCourses() {
      // Implement sorting logic here
      // For example, you can sort courses by title, price, rating, etc.

      // Update the courses array
      this.courses = this.filteredCourses;
    },
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  },
};
</script>

<style scoped>
.course-page {
  background: #f9f9f9;
  color: #333;
  padding: 20px;
}

/* Search Bar */
.search-bar-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in-out;
}

.search-input {
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  flex-grow: 1;
}

.search-btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #2980b9;
}

/* Filters Section */
.filters-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  animation: fadeInUp 1.5s ease-in-out;
}

.filters-section h4 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
}

.price-slider {
  width: 100%;
}

.sort-by select {
  padding: 10px;
  font-size: 1rem;
}

/* Course Listings */
.course-listings-section {
  animation: fadeIn 2s ease-in-out;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.course-listing-grid {
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.course-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.course-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.course-title {
  font-size: 1.5rem;
  margin-bottom: 10px;

}

.course-instructor {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.course-description {
  font-size: 1rem;
  margin-bottom: 15px;
}

.course-rating i {
  color: #f1c40f;
}

.course-price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.cta-btn {
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cta-btn:hover {
  background-color: #27ae60;
}

/* Scroll Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
  }

  .course-listing-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .course-thumbnail {
    height: 250px;
  }
}
</style>
