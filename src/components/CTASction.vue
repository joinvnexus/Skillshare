<template>
    <section class="cta-section">
      <div class="cta-container">
        <!-- Title -->
        <h2 class="cta-title">Ready to Start Learning?</h2>
  
        <!-- Description -->
        <p class="cta-description">
          Take the next step towards mastering Vue.js. Explore our courses and get started on your learning journey today!
        </p>
  
        <!-- CTA Buttons -->
        <div class="cta-buttons">
          <router-link to="/courses" class="primary-btn">Browse Courses</router-link>
          <button class="secondary-btn" @click="signUpNow">Sign Up Now</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "CTASction",
    methods: {
      browseCourses() {
        alert("Browse Courses clicked!");

        // Implement actual navigation to courses page
      },
      signUpNow() {
        alert("Sign Up Now clicked!");
        // Implement actual sign up flow
      }
    }
  };
  </script>
  
  <style scoped>
  /* CTA Section Styling */
  .cta-section {
    padding: 60px 20px;
    background-color: #3498db;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  /* Title Styling */
  .cta-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: white;
  }
  
  /* Description Styling */
  .cta-description {
    font-size: 1.2rem;
    margin-bottom: 30px;
    line-height: 1.6;
    color: #f0f8ff;
  }
  
  /* Buttons Container */
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  /* Primary Button Styling */
  .primary-btn {
    background-color: #ffffff;
    color: #3498db;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .primary-btn:hover {
    background-color: #f8f9fa;
    transform: translateY(-3px);
  }
  
  /* Secondary Button Styling */
  .secondary-btn {
    background-color: #f39c12;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .secondary-btn:hover {
    background-color: #e67e22;
    transform: translateY(-3px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .cta-title {
      font-size: 2rem;
    }
  
    .cta-description {
      font-size: 1rem;
    }
  
    .cta-buttons {
      flex-direction: column;
      gap: 15px;
    }
  
    .primary-btn, .secondary-btn {
      padding: 12px 20px;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .cta-title {
      font-size: 1.75rem;
    }
  
    .cta-description {
      font-size: 0.9rem;
    }
  
    .primary-btn, .secondary-btn {
      font-size: 0.95rem;
      padding: 10px 18px;
    }
  }
  </style>
  