<template>
  <section class="home-surface overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <div class="mb-8 sm:mb-10">
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Popular Right Now</p>
        <h2 class="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
          High-demand courses with the strongest student pull.
        </h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          A cleaner popular shelf with visible pricing, ratings, and category badges built to match the rest of the refreshed homepage.
        </p>
      </div>

      <LoadingSpinner v-if="loading" />

      <ErrorState v-else-if="error" :error="error" @retry="fetchPopularCourses" />

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div
          v-for="course in popularCourses"
          :key="course.id"
          class="popular-card group flex flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/88"
        >
          <div class="relative h-48 w-full overflow-hidden">
            <img
              :src="getCourseImage(course)"
              :alt="course.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent"></div>
            <div class="absolute left-3 top-3 flex flex-wrap gap-2">
              <span v-if="course.isPopular" class="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950">
                Popular
              </span>
              <span v-if="course.price === 0" class="rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                Free
              </span>
            </div>
            <div class="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
              {{ course.category || 'Course' }}
            </div>
          </div>

          <div class="flex flex-grow flex-col p-5">
            <div class="flex-grow">
              <h3 class="line-clamp-2 text-xl font-semibold text-slate-900">
                {{ course.title }}
              </h3>
              <p class="mt-2 text-sm font-medium text-slate-600">By {{ course.instructor || 'Unknown Instructor' }}</p>
              <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                {{ getCourseCopy(course) }}
              </p>
            </div>

            <div class="mt-auto">
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center">
                  <div class="mr-1 flex text-amber-400">
                    <span v-for="star in 5" :key="star">
                      <svg
                        class="h-4 w-4"
                        :class="{ 'text-gray-300': star > Math.round(course.rating || 0) }"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </span>
                  </div>
                  <span class="text-sm text-slate-600">
                    {{ formatRating(course.rating) }} ({{ course.reviewCount || 0 }})
                  </span>
                </div>
                <span class="text-base font-semibold text-slate-900">
                  {{ formatPrice(course) }}
                </span>
              </div>

              <div class="flex space-x-2">
                <router-link
                  :to="getCourseLink(course)"
                  class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  View Details
                </router-link>
                <router-link
                  :to="getCourseLink(course)"
                  class="btn-brand flex-1 rounded-xl px-4 py-2 text-center text-sm"
                >
                  Enroll Now
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center sm:mt-10">
        <router-link
          to="/courses"
          class="btn-brand inline-flex items-center rounded-xl px-6 py-3 text-base font-medium"
        >
          View All Courses
          <svg class="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </router-link>
      </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorState from '@/components/UI/ErrorState.vue'
import {
  formatCoursePrice,
  formatCourseRating,
  getCourseIdentifier,
  resolveCourseDescription,
  resolveCourseImage
} from '@/modules/course/coursePresentation'

export default {
  name: 'PopularCourses',
  components: { LoadingSpinner, ErrorState },
  computed: {
    ...mapState('catalog', ['loading', 'error']),
    ...mapGetters('catalog', ['getPopularCourses']),
    popularCourses() {
      return this.getPopularCourses.slice(0, 4)
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchCourses']),
    formatPrice(course) {
      return formatCoursePrice(course)
    },
    formatRating(rating) {
      return formatCourseRating(rating)
    },
    getCourseCopy(course) {
      return resolveCourseDescription(course)
    },
    getCourseImage(course) {
      return resolveCourseImage(course)
    },
    getCourseLink(course) {
      return `/courses/${getCourseIdentifier(course)}`
    },
    fetchPopularCourses() {
      this.fetchCourses()
    }
  },
  created() {
    if (this.getPopularCourses.length === 0) {
      this.fetchCourses()
    }
  }
}
</script>

<style scoped>
.popular-card {
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.popular-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--brand) 24%, white 76%);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.14);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
