<template>
  <div class="course-reviews space-y-8">
    <!-- Title -->
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Student Reviews</h2>
    
    <!-- Rating Overview -->
    <div class="rating-overview flex flex-col md:flex-row gap-6 md:gap-12 pb-8 border-b border-gray-200">
      <!-- Average Rating -->
      <div class="average-rating flex flex-col items-center w-full md:w-auto">
        <div class="score text-5xl font-bold text-blue-600 leading-none">{{ rating.toFixed(1) }}</div>
        <div class="stars flex gap-1 my-3">
          <i 
            v-for="i in 5" 
            :key="i" 
            class="fas fa-star text-lg"
            :class="{
              'text-yellow-400': i <= Math.round(rating),
              'text-gray-300': i > Math.round(rating)
            }"
          ></i>
        </div>
        <div class="count text-gray-500 text-sm">Based on {{ reviews.length }} reviews</div>
      </div>
      
      <!-- Rating Bars -->
      <div class="rating-bars flex-1 space-y-3 w-full">
        <div 
          class="bar" 
          v-for="n in 5" 
          :key="`bar-${n}`"
        >
          <div class="star-count flex items-center gap-3">
            <span class="text-gray-600 text-sm w-12">{{ n }} star</span>
            <div class="bar-container flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="bar-fill h-full bg-blue-500 rounded-full" 
                :style="{ width: `${getStarPercentage(n)}%` }"
              ></div>
            </div>
            <span class="text-gray-500 text-sm w-12 text-right">{{ getStarCount(n) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Reviews List -->
    <div class="reviews-list space-y-6">
      <div 
        class="review py-6 border-b border-gray-200 last:border-b-0"
        v-for="review in reviews" 
        :key="review.id"
      >
        <div class="review-header flex gap-4 mb-4">
          <div class="avatar w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
            <img 
              :src="review.avatar" 
              :alt="review.name"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="info">
            <h4 class="font-medium text-gray-800">{{ review.name }}</h4>
            <div class="meta flex items-center flex-wrap gap-2 mt-1">
              <div class="stars flex gap-1">
                <i 
                  v-for="i in 5" 
                  :key="i" 
                  class="fas fa-star text-sm"
                  :class="{
                    'text-yellow-400': i <= review.rating,
                    'text-gray-300': i > review.rating
                  }"
                ></i>
              </div>
              <span class="text-gray-500 text-xs">{{ review.date }}</span>
            </div>
          </div>
        </div>
        <div class="review-content">
          <h5 class="font-semibold text-gray-800 mb-2">{{ review.title }}</h5>
          <p class="text-gray-600 leading-relaxed">{{ review.content }}</p>
        </div>
      </div>
    </div>
    
    <!-- Load More Button -->
    <button 
      v-if="reviews.length < totalReviews"
      class="btn-load-more mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="$emit('load-more')"
    >
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
/* Animation for stars on hover */
.stars:hover i.text-yellow-400 {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Animation for bar fill */
.bar-fill {
  transition: width 1s ease-out;
}

/* Animation for review cards */
.review {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 400px) {
  .rating-overview {
    gap: 1.5rem;
  }
  
  .star-count {
    gap: 0.5rem;
  }
  
  .star-count span {
    min-width: 2.5rem;
  }
}
</style>