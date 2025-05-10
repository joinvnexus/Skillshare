<template>
    <footer class="footer-section">
      <!-- Footer Top: Links, Social Icons, and Newsletter Signup -->
      <div class="footer-top">
        <div class="footer-container">
          <!-- Quick Links Section -->
          <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
  
          <!-- Social Media Section -->
          <div class="footer-social">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            </ul>
          </div>
  
          <!-- Newsletter Signup Section -->
          <div class="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates on courses and blogs.</p>
            <form @submit.prevent="subscribeNewsletter">
              <input type="email" v-model="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Footer Bottom: Legal Information -->
      <div class="footer-bottom">
        <div class="footer-container">
          <div class="legal-info">
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </div>
          <p>&copy; 2024 Vue Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      subscribeNewsletter() {
        alert(`Subscribed with: ${this.email}`);
        this.email = ''; // Clear the input field after submission
      }
    }
  };
  </script>
  
  <style scoped>
  /* Footer Main Styles */
  .footer-section {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 40px 20px;
    text-align: center;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
  }
  
  /* Quick Links Section */
  .footer-links h4 {
    margin-bottom: 15px;
    color: #f39c12;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-links ul li {
    margin-bottom: 10px;
  }
  
  .footer-links ul li a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links ul li a:hover {
    color: #f39c12;
  }
  
  /* Social Media Section */
  .footer-social h4 {
    margin-bottom: 15px;
    color: #f39c12;
  }
  
  .footer-social ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }
  
  .footer-social ul li {
    margin-right: 15px;
  }
  
  .footer-social ul li a {
    color: #ecf0f1;
    font-size: 24px;
    transition: color 0.3s ease;
  }
  
  .footer-social ul li a:hover {
    color: #f39c12;
  }
  
  /* Newsletter Signup Section */
  .footer-newsletter h4 {
    margin-bottom: 15px;
    color: #f39c12;
  }
  
  .footer-newsletter p {
    margin-bottom: 15px;
    font-size: 1rem;
  }
  
  .footer-newsletter form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-newsletter input {
    padding: 10px;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    width: 250px;
  }
  
  .footer-newsletter button {
    padding: 10px 20px;
    background-color: #f39c12;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .footer-newsletter button:hover {
    background-color: #e67e22;
  }
  
  /* Footer Bottom Section */
  .footer-bottom {
    background-color: #1a252f;
    padding: 20px 0;
    color: #bdc3c7;
  }
  
  .legal-info {
    margin-bottom: 10px;
  }
  
  .legal-info a {
    color: #bdc3c7;
    text-decoration: none;
    margin: 0 5px;
  }
  
  .legal-info a:hover {
    color: #f39c12;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
    }
  
    .footer-newsletter input {
      margin-bottom: 15px;
      width: 100%;
    }
  
    .footer-newsletter button {
      width: 100%;
    }
  }
  </style>
  