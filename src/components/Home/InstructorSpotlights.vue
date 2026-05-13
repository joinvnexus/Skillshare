<template>
  <section>
      <div class="instructor-shell home-surface overflow-hidden rounded-[32px] border border-slate-200/80 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
        <div class="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Instructor Spotlights</p>
            <h2 class="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">The people behind the strongest learning paths.</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Showcase teaching credibility with a more structured instructor surface instead of plain profile tiles.
            </p>
          </div>
          <router-link to="/signup" class="inline-flex rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
            Become an instructor
          </router-link>
        </div>

        <LoadingSpinner v-if="loading" />

        <ErrorState v-else-if="error" :error="error" @retry="fetchInstructors" />

        <div v-else class="grid grid-cols-1 gap-6">
          <article
            v-for="instructor in featuredList"
            :key="instructor.id"
            class="instructor-card grid gap-5 rounded-[28px] border border-white/70 bg-white/88 p-5 lg:grid-cols-[112px_1fr]"
          >
            <div class="flex justify-center lg:justify-start">
              <img
                :src="instructor.photo"
                :alt="instructor.name"
                class="h-28 w-28 rounded-[26px] object-cover shadow-md"
              >
            </div>

            <div>
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-xl font-semibold text-slate-900">{{ instructor.name }}</h3>
                  <p class="mt-1 text-sm font-semibold text-[var(--brand-strong)]">{{ instructor.title || 'Instructor' }}</p>
                </div>
                <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                  Mentor
                </span>
              </div>

              <p class="mt-4 text-sm leading-7 text-slate-600">
                {{ instructor.bio || 'Delivers practical lessons, project guidance, and repeatable workflows for professional learners.' }}
              </p>

              <div class="mt-4 flex flex-wrap gap-2">
                <a
                  v-for="link in instructor.socialLinks"
                  :key="link.platform"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white"
                  :title="link.platform"
                >
                  <i :class="`${link.iconClass} text-sm`"></i>
                  <span>{{ link.platform }}</span>
                </a>
              </div>
            </div>
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
  name: 'InstructorSpotlights',
  components: { LoadingSpinner, ErrorState },
  computed: {
    ...mapState('instructors', ['loading', 'error']),
    ...mapGetters('instructors', ['allInstructors']),
    featuredList() {
      return this.allInstructors.slice(0, 4)
    }
  },
  created() {
    this.fetchInstructors()
  },
  methods: {
    ...mapActions('instructors', ['fetchInstructors'])
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.instructor-shell {
  background:
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.1), transparent 34%),
    radial-gradient(circle at 100% 100%, rgba(13, 148, 136, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.98));
}

.instructor-card {
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.instructor-card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--accent) 20%, white 80%);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.14);
}
</style>
