<template>
  <div class="course-reviews space-y-8">
    <h2 class="text-2xl font-bold text-[var(--text)] md:text-3xl">Student Reviews</h2>

    <div class="rating-overview flex flex-col gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:gap-12">
      <div class="average-rating flex w-full flex-col items-center md:w-auto">
        <div class="score text-5xl font-bold leading-none text-[var(--brand-strong)]">{{ rating.toFixed(1) }}</div>
        <div class="stars my-3 flex gap-1">
          <i
            v-for="i in 5"
            :key="i"
            class="fas fa-star text-lg"
            :class="{ 'text-yellow-400': i <= Math.round(rating), 'text-[var(--line)]': i > Math.round(rating) }"
          ></i>
        </div>
        <div class="count text-sm text-[var(--muted)]">Based on {{ totalReviewsLabel }} reviews</div>
      </div>

      <div class="rating-bars w-full flex-1 space-y-3">
        <div v-for="n in 5" :key="`bar-${n}`" class="bar">
          <div class="star-count flex items-center gap-3">
            <span class="w-12 text-sm text-[var(--muted)]">{{ n }} star</span>
            <div class="bar-container h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
              <div class="bar-fill h-full rounded-full bg-[var(--brand)]" :style="{ width: `${getStarPercentage(n)}%` }"></div>
            </div>
            <span class="w-12 text-right text-sm text-[var(--muted)]">{{ getStarCount(n) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="reviews.length === 0" class="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface-soft)] px-4 py-10 text-center">
      <h3 class="text-lg font-semibold text-[var(--text)]">No published reviews yet.</h3>
      <p class="mt-2 text-sm text-[var(--muted)]">This course will show learner feedback here once reviews are submitted.</p>
    </div>

    <div v-else class="reviews-list space-y-6">
      <article v-for="review in reviews" :key="review.id" class="review border-b border-[var(--line)] py-6 last:border-b-0">
        <div class="review-header mb-4 flex gap-4">
          <div class="avatar h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow">
            <img :src="review.avatar" :alt="review.name" class="h-full w-full object-cover" />
          </div>
          <div class="info">
            <h4 class="font-medium text-[var(--text)]">{{ review.name }}</h4>
            <div class="meta mt-1 flex flex-wrap items-center gap-2">
              <div class="stars flex gap-1">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="fas fa-star text-sm"
                  :class="{ 'text-yellow-400': i <= review.rating, 'text-[var(--line)]': i > review.rating }"
                ></i>
              </div>
              <span class="text-xs text-[var(--muted)]">{{ review.date }}</span>
            </div>
          </div>
        </div>
        <div class="review-content">
          <h5 class="mb-2 font-semibold text-[var(--text)]">{{ review.title }}</h5>
          <p class="leading-relaxed text-[var(--muted)]">{{ review.content }}</p>
        </div>
      </article>
    </div>

    <button
      v-if="reviews.length < totalReviews"
      class="btn-brand mx-auto rounded-lg px-6 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      @click="$emit('load-more')"
    >
      Load More Reviews
    </button>
  </div>
</template>

<script>
export default {
  name: "CourseReviews",
  props: {
    rating: {
      type: Number,
      required: true
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalReviewsLabel() {
      return this.totalReviews || this.reviews.length;
    }
  },
  methods: {
    getStarCount(star) {
      return this.reviews.filter((review) => Math.round(review.rating || 0) === star).length;
    },
    getStarPercentage(star) {
      const count = this.getStarCount(star);
      return this.reviews.length ? (count / this.reviews.length) * 100 : 0;
    }
  }
};
</script>

<style scoped>
.bar-fill {
  transition: width 1s ease-out;
}
</style>
