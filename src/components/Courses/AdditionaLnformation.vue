<template>
  <section class="additional-info">
    <div class="container">
      <h2 class="section-title">Additional Information</h2>

      <div class="insights">
        <!-- Popular Courses Section -->
        <div class="insight-card popular-courses">
          <h3 class="card-title">
            <i data-feather="trending-up"></i> Popular Courses
          </h3>
          <ul class="course-list">
            <li v-for="course in popularCourses" :key="course.id">
              <i data-feather="star"></i> {{ course.name }}
            </li>
          </ul>
        </div>

        <!-- Upcoming Courses Section -->
        <div class="insight-card upcoming-courses">
          <h3 class="card-title">
            <i data-feather="calendar"></i> Upcoming Courses
          </h3>
          <ul class="course-list">
            <li v-for="course in upcomingCourses" :key="course.id">
              <i data-feather="clock"></i> {{ course.name }} - {{ course.date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      popularCourses: [
        { id: 1, name: "Vue.js Basics" },
        { id: 2, name: "Advanced JavaScript" },
        { id: 3, name: "React Essentials" }
      ],
      upcomingCourses: [
        { id: 1, name: "Node.js Masterclass", date: "Sept 20, 2024" },
        { id: 2, name: "Python for Beginners", date: "Oct 10, 2024" },
        { id: 3, name: "Full Stack Development", date: "Nov 5, 2024" }
      ]
    };
  },
  mounted() {
    // Initialize Feather Icons
    feather.replace();
  }
};
</script>
<style>
.additional-info {
  background-color: #f8f9fa;
  color: #000;
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

  .insights {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    .insight-card {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      flex: 1 1 45%;
      max-width: 400px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .card-title {
        font-size: 1.5rem;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #007bff;

        i {
          margin-right: 8px;
          color: #007bff;
        }
      }

      .course-list {
        list-style: none;
        padding: 0;

        li {
          font-size: 1.2rem;
          margin-bottom: 10px;
          display: flex;
          align-items: center;

          i {
            margin-right: 8px;
            color: #28a745;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .insights {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
