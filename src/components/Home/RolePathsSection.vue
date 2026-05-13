<template>
  <section class="px-4 py-6 sm:py-10">
    <div class="mx-auto max-w-7xl">
      <div class="role-shell overflow-hidden rounded-[32px] border border-[var(--line)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
        <div class="grid gap-10 lg:grid-cols-[1.15fr_1.85fr] lg:items-start">
          <div class="space-y-5">
            <span class="inline-flex rounded-full bg-white/75 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-700">
              Built For Every Role
            </span>
            <div>
              <h2 class="max-w-xl text-3xl font-bold text-slate-950 sm:text-4xl">
                One platform, three production-ready workflows.
              </h2>
              <p class="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Students learn in guided tracks, instructors ship courses with better tooling, and admins keep the marketplace healthy with clear moderation controls.
              </p>
            </div>
            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 backdrop-blur"
              >
                <p class="text-2xl font-extrabold text-slate-950">{{ stat.value }}</p>
                <p class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 xl:grid-cols-3">
            <article
              v-for="card in roleCards"
              :key="card.title"
              class="role-card group flex h-full flex-col rounded-[28px] border border-white/70 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{{ card.kicker }}</p>
                  <h3 class="mt-2 text-2xl font-bold text-slate-950">{{ card.title }}</h3>
                </div>
                <span class="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white" :class="card.badgeClass">
                  {{ card.badge }}
                </span>
              </div>

              <p class="mt-4 flex-1 text-sm leading-7 text-slate-600">{{ card.description }}</p>

              <ul class="mt-5 space-y-2">
                <li
                  v-for="feature in card.features"
                  :key="feature"
                  class="rounded-2xl border border-slate-200/80 bg-white/85 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {{ feature }}
                </li>
              </ul>

              <router-link
                :to="card.cta.to"
                class="mt-5 inline-flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-950 transition duration-200"
                :class="card.ctaClass"
              >
                <span>{{ card.cta.label }}</span>
                <span aria-hidden="true">&rarr;</span>
              </router-link>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { label: 'Role journeys', value: '3' },
  { label: 'Reusable flows', value: '12+' },
  { label: 'Responsive views', value: '100%' }
]

const roleCards = [
  {
    kicker: 'Student',
    title: 'Learn',
    badge: 'S',
    badgeClass: 'bg-gradient-to-br from-sky-500 to-cyan-500',
    description: 'Browse curated courses, track progress, manage wishlist and cart, and keep every purchase accessible from a clean learner dashboard.',
    features: ['Course discovery and filtering', 'Wishlist, cart, and orders', 'Lesson progress tracking'],
    cta: { label: 'Explore courses', to: '/courses' },
    ctaClass: 'bg-sky-100 hover:bg-sky-200'
  },
  {
    kicker: 'Instructor',
    title: 'Teach',
    badge: 'I',
    badgeClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    description: 'Create, edit, and review course content with a structured studio that keeps publishing, student insights, and revenue data in one place.',
    features: ['Course studio workflow', 'Student and review management', 'Revenue and payout visibility'],
    cta: { label: 'Start as instructor', to: '/signup' },
    ctaClass: 'bg-emerald-100 hover:bg-emerald-200'
  },
  {
    kicker: 'Admin',
    title: 'Operate',
    badge: 'A',
    badgeClass: 'bg-gradient-to-br from-slate-700 to-slate-900',
    description: 'Moderate courses, manage users and testimonials, and keep marketplace content aligned with a cleaner control layer for platform operations.',
    features: ['Course moderation controls', 'Users, orders, and content review', 'Platform health overview'],
    cta: { label: 'View support center', to: '/support' },
    ctaClass: 'bg-slate-200 hover:bg-slate-300'
  }
]
</script>

<style scoped>
.role-shell {
  background:
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.16), transparent 34%),
    radial-gradient(circle at 100% 0%, rgba(13, 148, 136, 0.18), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98));
}

.role-card {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.88)),
    white;
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.role-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 20%, white 80%);
  box-shadow: 0 24px 44px rgba(15, 23, 42, 0.12);
}
</style>
