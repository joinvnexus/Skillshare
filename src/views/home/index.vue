<template>
  <main id="main-content" class="home-shell mx-auto max-w-[1680px] pb-24">
    <HeroSection />

    <section id="homepage-overview" class="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="proof-panel grid gap-4 rounded-[32px] border border-white/60 p-5 shadow-[0_32px_70px_rgba(15,23,42,0.12)] backdrop-blur md:grid-cols-[1.35fr_0.95fr] lg:gap-5 lg:p-7">
        <div class="grid gap-4 lg:grid-cols-3">
          <article v-for="stat in platformStats" :key="stat.label" class="rounded-[24px] border border-slate-200/80 bg-white/92 p-5">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{{ stat.label }}</p>
            <p class="mt-3 text-3xl font-extrabold text-slate-950">{{ stat.value }}</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ stat.copy }}</p>
          </article>
        </div>

        <div class="rounded-[28px] border border-slate-200/80 bg-slate-950 p-6 text-white">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-200">Fast Start</p>
          <h2 class="mt-3 text-2xl font-bold">Pick the lane that matches how you use the platform.</h2>
          <div class="mt-5 grid gap-3">
            <RouterLink
              v-for="link in entryLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
            >
              <span>{{ link.label }}</span>
              <span class="text-sky-200">{{ link.meta }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <RolePathsSection />

    <section class="section-band mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Platform Experience</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-950">A cleaner public product story, not a pile of cards.</h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-slate-600">
          Core platform capabilities are grouped by user intent so the homepage feels directed instead of stacked.
        </p>
      </div>
      <div class="grid items-start gap-8 xl:grid-cols-[1.08fr_0.92fr]">
        <FeaturesSection />
        <InstructorSpotlights />
      </div>
    </section>

    <section class="section-band mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Course Discovery</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-950">Discovery should feel curated before it feels crowded.</h2>
        </div>
        <RouterLink to="/courses" class="hidden rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white lg:inline-flex">
          Explore all courses
        </RouterLink>
      </div>
      <div class="grid items-start gap-8 xl:grid-cols-[1fr_1fr]">
        <FeaturedCourses />
        <PopularCourses />
      </div>
    </section>

    <section class="section-band mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-col gap-4 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Proof And Insight</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-950">Trust, content, and conversion should support each other.</h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-slate-600">
          Social proof, articles, and the newsletter are arranged as one supporting decision layer instead of isolated widgets.
        </p>
      </div>
      <div class="grid items-start gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <StudentTestimonials />
        <div class="grid gap-8">
          <BlogCard />
          <NewsletterSignup />
        </div>
      </div>
    </section>

    <div class="mt-14">
      <CTASection />
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import HeroSection from '@/components/Home/HeroSection.vue'
import FeaturesSection from '@/components/Home/FeaturesSection.vue'
import RolePathsSection from '@/components/Home/RolePathsSection.vue'
import InstructorSpotlights from '@/components/Home/InstructorSpotlights.vue'
import FeaturedCourses from '@/components/Home/FeaturedCourses.vue'
import PopularCourses from '@/components/Home/PopularCourses.vue'
import StudentTestimonials from '@/components/Home/StudentTestimonials.vue'
import NewsletterSignup from '@/components/Home/NewsletterSignup.vue'
import BlogCard from '@/components/Home/BlogCard.vue'
import CTASection from '@/components/Home/CTASction.vue'

const store = useStore()

const allCourses = computed(() => store.state.catalog.allCourses)
const freeCourseCount = computed(() => allCourses.value.filter((course) => Number(course.price || 0) === 0).length)
const featuredCourseCount = computed(() => allCourses.value.filter((course) => course.isFeatured).length)
const categoryCount = computed(() => new Set(allCourses.value.map((course) => course.category).filter(Boolean)).size)

const platformStats = computed(() => [
  {
    label: 'Courses Live',
    value: String(allCourses.value.length || 0),
    copy: 'Public catalog inventory now flows from the same shared marketplace state used across home and discovery pages.'
  },
  {
    label: 'Categories',
    value: `${categoryCount.value}+`,
    copy: 'Discovery is easier when visitors can quickly see how broad the active catalog actually is.'
  },
  {
    label: 'Free Starts',
    value: String(freeCourseCount.value || 0),
    copy: 'Low-friction entry points help new learners reach checkout or enrollment with less hesitation.'
  }
])

const entryLinks = computed(() => [
  { label: 'Start learning as a student', meta: `${allCourses.value.length || 0} courses live`, to: '/courses' },
  { label: 'Set up your instructor workspace', meta: `${featuredCourseCount.value || 0} featured picks`, to: '/signup' },
  { label: 'Review platform operations', meta: `${freeCourseCount.value || 0} free starts`, to: '/support' }
])

onBeforeMount(() => {
  if (!allCourses.value.length) {
    store.dispatch('catalog/fetchCourses').catch(() => {})
  }
})
</script>

<style scoped>
.home-shell {
  padding-inline: 8px;
}

.proof-panel {
  background:
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.18), transparent 32%),
    radial-gradient(circle at 100% 0%, rgba(13, 148, 136, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.98));
}

.section-band {
  position: relative;
}

.section-band::before {
  content: '';
  position: absolute;
  inset: -24px 10px auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.45), transparent);
}

.section-band:first-of-type::before {
  display: none;
}

.home-shell::after {
  content: '';
  position: fixed;
  inset: auto 0 0;
  height: 0;
  pointer-events: none;
}

.content-stage,
.section-band :deep(.home-surface) {
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 28%),
    radial-gradient(circle at 0% 100%, color-mix(in srgb, var(--brand) 9%, transparent), transparent 26%),
    rgba(255, 255, 255, 0.72);
  box-shadow: 0 20px 46px rgba(15, 23, 42, 0.08);
}

@media (min-width: 1024px) {
  .home-shell {
    padding-inline: 14px;
  }

  .section-band::before {
    inset: -28px 24px auto;
  }
}
</style>
