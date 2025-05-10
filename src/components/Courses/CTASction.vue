<template>
    <section class="cta-section">
      <div class="container">
        <h2 class="cta-title">Ready to Take Your Skills to the Next Level?</h2>
        <p class="cta-description">
          Unlock your potential by exploring our wide range of expert-led courses. Whether you're looking to advance your career or learn something new, we've got the perfect course for you.
        </p>
  
        <div class="cta-buttons">
          <button class="primary-btn" @click="browseCourses">Browse All Courses</button>
          <button class="secondary-btn" @click="signUpForTrial">Sign Up for Free Trial</button>
        </div>
      </div>
    </section>
  </template>
  <script>
  export default {
    methods: {
      browseCourses() {
        // Redirect or open courses page
        this.$router.push("/courses");
      },
      signUpForTrial() {
        // Redirect or open sign-up page
        this.$router.push("/signup");
      }
    }
  };
  </script>
  <style scoped>
.cta-section {
  background: linear-gradient(135deg, #007bff 0%, #00c6ff 100%);
  padding: 60px 20px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #fff;
    text-transform: uppercase;
  }

  .cta-description {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 40px auto;
    color: #e0e0e0;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;

    .primary-btn,
    .secondary-btn {
      padding: 15px 30px;
      font-size: 1.2rem;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    /* Primary CTA Button */
    .primary-btn {
      background-color: #ff6b6b;
      color: white;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);

      &:hover {
        background-color: #ff4d4d;
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(255, 107, 107, 0.75);
      }
    }

    /* Secondary CTA Button */
    .secondary-btn {
      background-color: transparent;
      border: 2px solid white;
      color: white;

      &:hover {
        background-color: white;
        color: #007bff;
        border-color: white;
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.5);
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .cta-title {
      font-size: 2rem;
    }

    .cta-description {
      font-size: 1rem;
      margin-bottom: 30px;
    }

    .cta-buttons {
      flex-direction: column;
      gap: 15px;

      .primary-btn,
      .secondary-btn {
        width: 100%;
      }
    }
  }
}

</style>