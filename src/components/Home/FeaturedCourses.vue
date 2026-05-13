<template>
  <section class="home-surface overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <div class="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Featured Courses</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Top-rated launches worth starting now.</h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            A tighter course rail that surfaces instructor credibility, student proof, and pricing without the older overlay-heavy cards.
          </p>
        </div>
        <router-link to="/courses" class="inline-flex rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
          View catalog
        </router-link>
      </div>

      <LoadingSpinner v-if="loading" />

      <ErrorState v-else-if="error" :error="error" @retry="fetchCourses" />

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="(course, index) in getFeaturedCourses"
          :key="course.id"
          class="course-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90"
          @mouseenter="hoveredCourse = index"
          @mouseleave="hoveredCourse = null"
        >
          <div class="relative h-52 overflow-hidden">
            <img
              :src="course.image || fallbackImage"
              :alt="course.title"
              class="h-full w-full object-cover transition-transform duration-500"
              :class="{ 'scale-105': hoveredCourse === index }"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/10 to-transparent"></div>
            <div class="absolute left-4 top-4 flex flex-wrap gap-2">
              <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                {{ course.category || 'Course' }}
              </span>
              <span v-if="course.isNew" class="rounded-full bg-sky-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                New
              </span>
            </div>
            <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">By {{ course.instructor }}</p>
                <p class="mt-1 text-lg font-bold">{{ course.title }}</p>
              </div>
              <span class="rounded-2xl bg-white/14 px-3 py-2 text-sm font-semibold backdrop-blur">
                {{ formatPrice(course.price) }}
              </span>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <div class="flex text-amber-400">
                <span v-for="star in 5" :key="star">
                  <svg
                    class="h-5 w-5"
                    :class="{ 'text-gray-300': star > Math.round(course.rating) }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              <span>{{ Number(course.rating || 0).toFixed(1) }}</span>
              <span class="h-1 w-1 rounded-full bg-slate-300"></span>
              <span>{{ course.students || 0 }} students</span>
            </div>

            <p class="mt-4 flex-1 text-sm leading-7 text-slate-600">
              {{ course.descriptionExtended || course.description || 'Practical curriculum designed to move from theory into shipping work.' }}
            </p>

            <div class="mt-5 flex items-center justify-between gap-3 rounded-[22px] border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-sm">
              <div>
                <p class="font-semibold text-slate-900">{{ course.duration || 'Self paced' }}</p>
                <p class="mt-1 text-slate-500">{{ course.lessons || 0 }} lessons</p>
              </div>
              <router-link
                :to="`/courses/${course.slug || course.id}`"
                class="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
              >
                View details
              </router-link>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorState from '@/components/UI/ErrorState.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CoursePreviews',
  components: {
    LoadingSpinner,
    ErrorState
  },
  data() {
    return {
      hoveredCourse: null,
      fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    }
  },
  computed: {
    ...mapState('catalog', ['loading', 'error']),
    ...mapGetters('catalog', ['getFeaturedCourses'])
  },
  created() {
    if (this.getFeaturedCourses.length === 0) {
      this.fetchCourses()
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchCourses']),
    formatPrice(price) {
      return Number(price) === 0 ? 'Free' : `$${price ?? 0}`
    }
  }
}
</script>

<style scoped>
.course-card {
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.course-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 22%, white 78%);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.14);
}
</style>
