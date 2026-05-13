<template>
  <section class="relative overflow-hidden">
      <div class="testimonial-shell home-surface overflow-hidden rounded-[32px] border border-slate-200/80 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
        <div class="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Student Outcomes</p>
            <h2 class="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Proof that the learning flow is landing.</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Testimonials now read like product evidence instead of isolated quote cards.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-center">
              <p class="text-xl font-extrabold text-slate-950">{{ stat.value }}</p>
              <p class="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <LoadingSpinner v-if="loading" />

        <ErrorState v-else-if="error" :error="error" @retry="fetchTestimonials" />

        <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article
            v-for="testimonial in featuredTestimonialsList"
            :key="testimonial.id"
            class="testimonial-card relative rounded-[28px] border border-white/80 bg-white/88 p-6"
          >
            <div class="absolute right-5 top-4 text-5xl font-black text-sky-100">"</div>
            <div class="flex items-center gap-4">
              <img
                :src="testimonial.photo"
                :alt="testimonial.name"
                class="h-16 w-16 rounded-2xl object-cover shadow-md"
              />
              <div>
                <h3 class="text-lg font-semibold text-slate-900">{{ testimonial.name }}</h3>
                <p class="text-sm font-medium text-[var(--brand-strong)]">{{ testimonial.role || testimonial.title }}</p>
              </div>
            </div>

            <div class="mt-5 flex text-amber-400">
              <span v-for="star in 5" :key="star">
                <svg
                  class="h-5 w-5"
                  :class="{ 'text-gray-300': star > testimonial.rating }"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </div>

            <p class="mt-5 text-sm leading-7 text-slate-600">
              {{ testimonial.quote }}
            </p>
          </article>
        </div>
      </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'
import ErrorState from '@/components/UI/ErrorState.vue'

export default {
  name: 'StudentTestimonials',
  components: { LoadingSpinner, ErrorState },
  computed: {
    ...mapState('testimonials', ['loading', 'error']),
    ...mapGetters('testimonials', ['allTestimonials']),
    featuredTestimonialsList() {
      return this.allTestimonials.slice(0, 4)
    },
    stats() {
      return [
        { label: 'Stories', value: String(this.featuredTestimonialsList.length || 4) },
        { label: 'Rating', value: '4.9/5' },
        { label: 'Career Shift', value: 'Real' }
      ]
    }
  },
  created() {
    this.fetchTestimonials()
  },
  methods: {
    ...mapActions('testimonials', ['fetchTestimonials'])
  }
}
</script>

<style scoped>
.testimonial-shell {
  background:
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.12), transparent 34%),
    radial-gradient(circle at 100% 100%, rgba(13, 148, 136, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.98));
}

.testimonial-card {
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--accent) 20%, white 80%);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.14);
}
</style>
