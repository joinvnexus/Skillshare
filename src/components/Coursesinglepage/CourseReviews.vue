<template>
  <div class="course-reviews">
    <h2>Student Reviews</h2>
    
    <div class="rating-overview">
      <div class="average-rating">
        <div class="score">{{ rating.toFixed(1) }}</div>
        <div class="stars">
          <i v-for="i in 5" :key="i" :class="['fas fa-star', { 'filled': i <= Math.round(rating) }]"></i>
        </div>
        <div class="count">Based on {{ reviews.length }} reviews</div>
      </div>
      
      <div class="rating-bars">
        <div class="bar" v-for="n in 5" :key="`bar-${n}`">
          <div class="star-count">
            <span>{{ n }} star</span>
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: `${getStarPercentage(n)}%` }"></div>
            </div>
            <span>{{ getStarCount(n) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="reviews-list">
      <div class="review" v-for="review in reviews" :key="review.id">
        <div class="review-header">
          <div class="avatar">
            <img :src="review.avatar" :alt="review.name">
          </div>
          <div class="info">
            <h4>{{ review.name }}</h4>
            <div class="meta">
              <div class="stars">
                <i v-for="i in 5" :key="i" :class="['fas fa-star', { 'filled': i <= review.rating }]"></i>
              </div>
              <span class="date">{{ review.date }}</span>
            </div>
          </div>
        </div>
        <div class="review-content">
          <h5>{{ review.title }}</h5>
          <p>{{ review.content }}</p>
        </div>
      </div>
    </div>
    
    <button class="btn btn-load-more" v-if="reviews.length < totalReviews">
      Load More Reviews
    </button>
  </div>
</template>

<script>
export default {
  name: 'CourseReviews',
  props: {
    rating: {
      type: Number,
      required: true
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      totalReviews: 1250,
      sampleReviews: [
        {
          id: 1,
          name: 'Alex Johnson',
          avatar: '/images/avatars/avatar1.jpg',
          rating: 5,
          date: '2 weeks ago',
          title: 'Excellent course!',
          content: 'This course exceeded my expectations. The instructor explains concepts clearly and the projects are very practical. I learned so much!'
        },
        {
          id: 2,
          name: 'Sarah Miller',
          avatar: '/images/avatars/avatar2.jpg',
          rating: 4,
          date: '1 month ago',
          title: 'Great content',
          content: 'Very comprehensive course with lots of hands-on examples. Some sections could be more detailed, but overall a great learning experience.'
        },
        {
          id: 3,
          name: 'Michael Chen',
          avatar: '/images/avatars/avatar3.jpg',
          rating: 5,
          date: '2 months ago',
          title: 'Best Vue.js course',
          content: 'I\'ve taken several Vue courses and this is by far the best. The instructor\'s teaching style is engaging and the material is up-to-date.'
        }
      ]
    }
  },
  created() {
    // Use sample reviews if none provided
    if (this.reviews.length === 0) {
      this.$emit('update:reviews', this.sampleReviews)
    }
  },
  methods: {
    getStarCount(star) {
      // This would normally come from API
      const counts = {
        5: 850,
        4: 250,
        3: 100,
        2: 30,
        1: 20
      }
      return counts[star] || 0
    },
    getStarPercentage(star) {
      const count = this.getStarCount(star)
      return (count / this.totalReviews) * 100
    }
  }
}
</script>

<style scoped>
.course-reviews h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.rating-overview {
  display: flex;
  gap: 50px;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.average-rating {
  text-align: center;
  flex: 0 0 150px;
}

.score {
  font-size: 3rem;
  font-weight: 700;
  color: #4e6bff;
  line-height: 1;
}

.stars {
  margin: 10px 0;
}

.stars i {
  color: #ffc107;
}

.count {
  color: #666;
  font-size: 0.9rem;
}

.rating-bars {
  flex: 1;
}

.bar {
  margin-bottom: 10px;
}

.star-count {
  display: flex;
  align-items: center;
  gap: 10px;
}

.star-count span {
  min-width: 50px;
  font-size: 0.9rem;
}

.bar-container {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #4e6bff;
}

.reviews-list {
  margin-bottom: 30px;
}

.review {
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.review-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h4 {
  margin: 0 0 5px;
  font-size: 1rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta .stars i {
  font-size: 0.8rem;
  color: #ffc107;
}

.date {
  font-size: 0.8rem;
  color: #666;
}

.review-content h5 {
  margin: 0 0 10px;
  font-size: 1rem;
}

.review-content p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.btn-load-more {
  display: block;
  margin: 30px auto 0;
  padding: 12px 30px;
  background: #4e6bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-load-more:hover {
  background: #3a56d4;
}
</style>