<template>
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">What Our Students Are Saying</h2>
        
        <!-- Toggle between carousel and grid -->
        <div class="layout-toggle">
          <button @click="isCarousel = true">Carousel</button>
          <button @click="isCarousel = false">Grid</button>
        </div>
  
        <!-- Testimonials Carousel or Grid -->
        <div v-if="isCarousel" class="carousel">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <blockquote>{{ testimonial.review }}</blockquote>
            <p class="student-name">{{ testimonial.name }}</p>
          </div>
        </div>
  
        <div v-else class="grid">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <blockquote>{{ testimonial.review }}</blockquote>
            <p class="student-name">{{ testimonial.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  export default {
    data() {
      return {
        isCarousel: true, // Default view: carousel
        testimonials: [
          { name: "John Doe", review: "This course changed my life!" },
          { name: "Jane Smith", review: "The best learning experience I've ever had." },
          { name: "Mark Wilson", review: "Highly recommend this platform to everyone." },
          { name: "Emily Johnson", review: "Amazing instructors and top-notch content!" }
        ]
      };
    },
    mounted() {
      // You can initialize any JS-based carousel plugin here if needed
    }
  };
  </script>
 <style scoped>
.testimonials {
  background-color: #f9fafc;
  padding: 40px 20px;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;
  }

  .layout-toggle {
    margin-bottom: 20px;

    button {
      background-color: #007bff;
      border: none;
      color: white;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }

      &:focus {
        outline: none;
      }
    }
  }

  /* Carousel layout */
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 20px;

    .testimonial-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      min-width: 300px;
      flex: 0 0 auto;
      scroll-snap-align: start;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      blockquote {
        font-size: 1.2rem;
        font-style: italic;
        margin-bottom: 15px;
        color: #333;
      }

      .student-name {
        font-weight: bold;
        color: #007bff;
      }
    }
  }

  /* Grid layout */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .testimonial-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      blockquote {
        font-size: 1.2rem;
        font-style: italic;
        margin-bottom: 15px;
        color: #333;
      }

      .student-name {
        font-weight: bold;
        color: #007bff;
      }
    }
  }

  @media (max-width: 768px) {
    .carousel {
      flex-direction: column;
    }
  }
}

</style>  