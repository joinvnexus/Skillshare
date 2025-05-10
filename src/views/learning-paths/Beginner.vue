<template>
  <div class="beginner-path">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      {{ error }}
      <button @click="fetchPath" class="retry-button">Try Again</button>
    </div>

    <!-- Content -->
    <div v-else class="path-content">
      <div class="path-header">
        <div class="header-content">
          <img :src="path.icon" :alt="path.title" class="path-icon">
          <div>
            <h1 class="path-title">{{ path.title }}</h1>
            <p class="path-description">{{ path.description }}</p>
          </div>
        </div>
        <div class="path-meta">
          <div class="meta-item">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z"/>
            </svg>
            <span>{{ path.courses }} Courses</span>
          </div>
          <div class="meta-item">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>{{ path.duration }}</span>
          </div>
        </div>
      </div>

      <div class="path-body">
        <div class="features-section">
          <h2>What You'll Learn</h2>
          <ul class="features-list">
            <li v-for="(feature, index) in path.features" :key="index">
              <svg class="check-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="curriculum-section">
          <h2>Curriculum</h2>
          <div class="module" v-for="module in path.curriculum" :key="module.module">
            <h3 class="module-title">{{ module.title }}</h3>
            <ul class="lessons-list">
              <li v-for="lesson in module.lessons" :key="lesson.title">
                <span class="lesson-title">{{ lesson.title }}</span>
                <span class="lesson-duration">{{ lesson.duration }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="cta-section">
          <router-link to="/signup" class="cta-button">Start Learning Now</router-link>
          <p class="cta-note">7-day free trial available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BeginnerPath',
  
  computed: {
    ...mapState('learningPaths', {
      path: 'currentPath',
      isLoading: state => state.isLoading,
      error: state => state.error
    })
  },
  
  created() {
    this.fetchPath()
  },
  
  methods: {
    ...mapActions('learningPaths', ['fetchPathBySlug']),
    
    fetchPath() {
      this.fetchPathBySlug('beginner')
    }
  },
  
  metaInfo() {
    return {
      title: 'Beginner Vue.js Learning Path',
      meta: [
        { 
          name: 'description', 
          content: 'Start your Vue.js journey with our beginner-friendly learning path'
        }
      ]
    }
  }
}
</script>

<style scoped>
.beginner-path {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.path-header {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.path-icon {
  width: 80px;
  height: 80px;
}

.path-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.path-description {
  font-size: 1.1rem;
  color: #666;
}

.path-meta {
  display: flex;
  gap: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.icon {
  width: 20px;
  height: 20px;
  fill: #42b983;
}

.path-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .path-body {
    grid-template-columns: 1fr 2fr;
  }
}

.features-section h2,
.curriculum-section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.check-icon {
  width: 20px;
  height: 20px;
  fill: #42b983;
}

.module {
  margin-bottom: 1.5rem;
}

.module-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.lessons-list {
  list-style: none;
  padding: 0;
  border-left: 3px solid #eee;
  padding-left: 1rem;
}

.lessons-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.lesson-title {
  color: #333;
}

.lesson-duration {
  color: #666;
  font-size: 0.9rem;
}

.cta-section {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #3aa876;
}

.cta-note {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}
</style>