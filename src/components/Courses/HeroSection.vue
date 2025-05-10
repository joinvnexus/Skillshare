<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Explore Our Courses</h1>
      <p class="hero-subtitle">Find the perfect course to advance your Vue.js skills.</p>
      <button class="cta-btn primary">Browse Courses</button>
      <button class="cta-btn secondary">Get Started Free</button>
    </div>
    <div class="hero-visual">
      <img src="https://vinsys.com/static/media/training/course/banner/vinsysBannerimage_sk7l2CA.svg" alt="Learning Image" class="responsive-image" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CoursesHeroSection',
};
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 20px;
  background-color: #f9fafc;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  max-width: 50%;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 3.5rem;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.cta-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-btn.primary {
  background-color: #3498db;
  color: white;
  margin-right: 15px;
}

.cta-btn.primary:hover {
  background-color: #2980b9;
}

.cta-btn.secondary {
  background-color: #e74c3c;
  color: white;
}

.cta-btn.secondary:hover {
  background-color: #c0392b;
}

.hero-visual {
  flex: 1;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;
  overflow: hidden;
}

.responsive-image {
  max-width: 90%;
  height: auto;
  object-fit: contain;
  
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    height: auto;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-visual {
    margin-top: 30px;
  }

  .cta-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
