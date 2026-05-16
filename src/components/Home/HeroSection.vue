<template>
  <section class="hero-wrap relative overflow-hidden px-4 pb-20 pt-16 sm:pt-20">
    <div class="absolute inset-0 bg-slate-950/58"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.28),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(13,148,136,0.24),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0.82))]"></div>

    <img
      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80"
      alt="Coding background"
      class="absolute inset-0 h-full w-full object-cover object-center"
    />

    <div class="relative z-10 mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="animate-fade-in text-white">
        <span class="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-sky-100">
          Build Skills With Structure
        </span>
        <h1 class="mt-6 max-w-4xl animate-slide-up text-4xl font-bold leading-[1.05] md:text-6xl xl:text-7xl">
          Learn, teach, and manage a modern course marketplace
          <span class="block text-sky-300">from one focused platform.</span>
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-xl">
          FocusCircle combines guided learning paths, instructor publishing tools, and clean admin operations in a homepage that now reflects the full product surface.
        </p>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <router-link to="/courses" class="btn-brand inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold shadow-[0_20px_50px_rgba(14,165,233,0.25)]">
            Browse Courses
          </router-link>
          <router-link
            to="/signup"
            class="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/18"
          >
            Create Your Account
          </router-link>
        </div>

        <div class="mt-10 grid gap-4 text-sm text-white/82 sm:grid-cols-3">
          <article v-for="metric in heroMetrics" :key="metric.label" class="rounded-[24px] border border-white/12 bg-white/10 px-5 py-4 backdrop-blur">
            <p class="text-2xl font-extrabold text-white">{{ metric.value }}</p>
            <p class="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/62">{{ metric.label }}</p>
            <p class="mt-2 leading-6">{{ metric.copy }}</p>
          </article>
        </div>
      </div>

      <div class="hero-panel rounded-[32px] border border-white/12 p-5 text-white shadow-[0_26px_70px_rgba(2,6,23,0.3)] backdrop-blur xl:p-6">
        <div class="rounded-[28px] border border-white/10 bg-slate-950/35 p-6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">Platform Map</p>
              <h2 class="mt-2 text-2xl font-bold">Homepage control surface</h2>
            </div>
            <span class="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">Updated</span>
          </div>

          <div class="mt-6 space-y-3">
            <article v-for="item in heroFlows" :key="item.title" class="rounded-[22px] border border-white/10 bg-white/8 p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-lg font-semibold">{{ item.title }}</p>
                  <p class="mt-2 text-sm leading-6 text-white/72">{{ item.copy }}</p>
                </div>
                <span class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                  {{ item.badge }}
                </span>
              </div>
            </article>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <router-link
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-semibold transition hover:bg-white/14"
            >
              <p>{{ link.label }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{{ link.meta }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
      <button @click="scrollToContent" class="text-white/90 hover:text-white" aria-label="Scroll to content">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const heroFlows = [
  {
    title: 'Student onboarding',
    copy: 'Course discovery, wishlist, cart, order history, and progress continue from the homepage.',
    badge: 'Learn'
  },
  {
    title: 'Instructor workspace',
    copy: 'Publishing tools, revenue views, and reviews are introduced as part of the public story.',
    badge: 'Teach'
  },
  {
    title: 'Admin operations',
    copy: 'Moderation, reports, and marketplace oversight are now visible as a first-class workflow.',
    badge: 'Operate'
  }
]

const quickLinks = [
  { label: 'Explore the marketplace', meta: 'Courses and categories', to: '/courses' },
  { label: 'Open your teaching path', meta: 'Instructor signup', to: '/signup' },
  { label: 'Check support operations', meta: 'Platform control', to: '/support' }
]

export default {
  name: 'HeroSection',
  data() {
    return {
      heroFlows,
      quickLinks
    }
  },
  computed: {
    ...mapState('catalog', ['allCourses']),
    heroMetrics() {
      const categoryCount = new Set(this.allCourses.map((course) => course.category).filter(Boolean)).size
      const freeCourseCount = this.allCourses.filter((course) => Number(course.price || 0) === 0).length

      return [
        {
          value: `${this.allCourses.length || 0}+`,
          label: 'Courses',
          copy: 'Structured learning inventory across practical technical tracks.'
        },
        {
          value: `${categoryCount || 0}+`,
          label: 'Categories',
          copy: 'Discovery breadth is now visible before learners hit the main catalog.'
        },
        {
          value: `${freeCourseCount || 0}+`,
          label: 'Free Starts',
          copy: 'Low-friction entry courses are surfaced as part of the landing experience.'
        }
      ]
    }
  },
  created() {
    if (!this.allCourses.length) {
      this.fetchCourses().catch(() => {})
    }
  },
  methods: {
    ...mapActions('catalog', ['fetchCourses']),
    scrollToContent() {
      const content = document.querySelector('#homepage-overview')
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.hero-wrap {
  background: linear-gradient(160deg, color-mix(in srgb, var(--brand) 22%, #0f172a 78%), #0f172a);
}

.hero-panel {
  background:
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.2), transparent 36%),
    radial-gradient(circle at 100% 0%, rgba(13, 148, 136, 0.18), transparent 30%),
    rgba(15, 23, 42, 0.34);
}

.animate-fade-in {
  animation: fadeIn 1.1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.9s ease-out forwards;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-14px) translateX(-50%);
  }
  60% {
    transform: translateY(-8px) translateX(-50%);
  }
}
</style>
