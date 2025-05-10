<template>
    <section class="newsletter-signup">
      <div class="container">
        <!-- Title and Description -->
        <h2 class="newsletter-title">Stay Updated</h2>
        <p class="newsletter-description">
          Subscribe to our newsletter to receive the latest updates, tutorials, and exclusive offers.
        </p>
  
        <!-- Signup Form -->
        <form class="signup-form" @submit.prevent="subscribe">
          <div class="input-wrapper">
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email address"
              class="email-input"
              required
            />
            <button type="submit" class="subscribe-btn">Subscribe</button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "NewsletterSignup",
    data() {
      return {
        email: "",
      };
    },
    methods: {
      subscribe() {
        if (this.email) {
          // Simulate a successful subscription
          alert(`Thank you for subscribing with: ${this.email}`);
          this.email = ""; // Clear the email field
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Newsletter Signup Section */
  .newsletter-signup {
    padding: 60px 20px;
    background-color: #f4f9fc;
    text-align: center;
    animation: fadeIn 1s ease;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Title */
  .newsletter-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  /* Description */
  .newsletter-description {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 30px;
  }
  
  /* Signup Form */
  .signup-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Input Wrapper */
  .input-wrapper {
    display: flex;
    width: 100%;
    max-width: 500px;
    position: relative;
  }
  
  /* Email Input */
  .email-input {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    border: 2px solid #3498db;
    border-radius: 30px 0 0 30px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .email-input:focus {
    border-color: #2980b9;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
    outline: none;
  }
  
  /* Subscribe Button */
  .subscribe-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 0 30px 30px 0;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
  }
  
  .subscribe-btn:hover {
    background-color: #2980b9;
  }
  
  /* Fade In Animation */
  @keyframes fadeIn {
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
    .newsletter-title {
      font-size: 2rem;
    }
    .newsletter-description {
      font-size: 1rem;
    }
    .email-input {
      font-size: 1rem;
    }
    .subscribe-btn {
      font-size: 1rem;
      padding: 15px 20px;
    }
  }
  
  @media (max-width: 480px) {
    .signup-form {
      flex-direction: column;
    }
  
    .email-input {
      border-radius: 30px;
      margin-bottom: 15px;
    }
  
    .subscribe-btn {
      border-radius: 30px;
      width: 100%;
    }
  }
  </style>
  