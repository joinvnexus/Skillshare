<template>
  <div class="course-sidebar">
    <div class="sidebar-card">
      <div class="card-header">
        <h3>Course Details</h3>
      </div>
      <div class="card-body">
        <ul class="course-meta">
          <li>
            <i class="fas fa-clock"></i>
            <span>Duration: <strong>{{ course.duration }}</strong></span>
          </li>
          <li>
            <i class="fas fa-book"></i>
            <span>Lessons: <strong>{{ course.lessons }}</strong></span>
          </li>
          <li>
            <i class="fas fa-signal"></i>
            <span>Level: <strong>{{ course.level }}</strong></span>
          </li>
          <li>
            <i class="fas fa-language"></i>
            <span>Language: <strong>English</strong></span>
          </li>
          <li>
            <i class="fas fa-certificate"></i>
            <span>Certificate: <strong>Yes</strong></span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="sidebar-card price-card">
      <div class="price">
        <span class="current">${{ course.price }}</span>
        <span class="original" v-if="course.originalPrice">${{ course.originalPrice }}</span>
      </div>
      <button class="btn btn-enroll" @click="$emit('enroll')">
        Enroll Now
      </button>
      <p class="money-back">30-Day Money-Back Guarantee</p>
      
      <div class="includes">
        <h4>This course includes:</h4>
        <ul>
          <li><i class="fas fa-video"></i> {{ course.duration }} on-demand video</li>
          <li><i class="fas fa-file-alt"></i> {{ course.lessons }} downloadable resources</li>
          <li><i class="fas fa-mobile-alt"></i> Access on mobile and TV</li>
          <li><i class="fas fa-infinity"></i> Full lifetime access</li>
          <li><i class="fas fa-trophy"></i> Certificate of completion</li>
        </ul>
      </div>
    </div>
    
    <div class="sidebar-card share-card">
      <h4>Share this course</h4>
      <div class="social-links">
        <a href="#" class="social-link facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social-link twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-link linkedin">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="#" class="social-link whatsapp">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseSidebar',
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.course-sidebar {
  position: sticky;
  top: 20px;
}

.sidebar-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.card-body {
  padding: 20px;
}

.course-meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-meta li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.course-meta li:last-child {
  border-bottom: none;
}

.course-meta i {
  width: 20px;
  color: #4e6bff;
}

.price-card {
  text-align: center;
}

.price {
  margin: 20px 0;
}

.current {
  font-size: 2rem;
  font-weight: 700;
  color: #4e6bff;
}

.original {
  font-size: 1.2rem;
  text-decoration: line-through;
  color: #999;
  margin-left: 10px;
}

.btn-enroll {
  display: block;
  width: 100%;
  padding: 15px;
  background: #4e6bff;
  color: white;
  border: none;
  border-radius: 6px;
font-weight: 600;
font-size: 1.1rem;
cursor: pointer;
transition: background 0.3s;
}

.btn-enroll:hover {
background: #3a56d4;
}

.money-back {
margin: 15px 0;
color: #666;
font-size: 0.9rem;
}

.includes {
text-align: left;
padding-top: 20px;
border-top: 1px solid #f0f0f0;
}

.includes h4 {
font-size: 1rem;
margin-bottom: 15px;
}

.includes ul {
list-style: none;
padding: 0;
margin: 0;
}

.includes li {
display: flex;
align-items: center;
gap: 10px;
padding: 8px 0;
font-size: 0.9rem;
}

.includes i {
width: 20px;
color: #4e6bff;
}

.share-card {
padding: 20px;
}

.share-card h4 {
margin-top: 0;
margin-bottom: 15px;
font-size: 1rem;
}

.social-links {
display: flex;
justify-content: space-between;
}

.social-link {
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
transition: transform 0.3s;
}

.social-link:hover {
transform: translateY(-3px);
}

.facebook {
background: #3b5998;
}

.twitter {
background: #1da1f2;
}

.linkedin {
background: #0077b5;
}

.whatsapp {
background: #25d366;
}
</style>

