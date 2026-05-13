<template>
  <div class="workspace-shell min-h-screen">
    <RouterView v-if="isAdminPanel || isInstructorPanel" />

    <div v-else class="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 lg:px-6 xl:grid-cols-[280px_1fr]">
      <aside class="workspace-sidebar section-shell h-fit overflow-hidden p-5 xl:sticky xl:top-24">
        <div class="rounded-[24px] bg-slate-950 px-5 py-5 text-white">
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">{{ roleConfig.eyebrow }}</p>
          <h2 class="mt-3 text-2xl font-bold">{{ roleConfig.label }}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-300">{{ roleConfig.description }}</p>
        </div>

        <div class="mt-5 rounded-[22px] border border-slate-200 bg-slate-50/90 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Signed In</p>
          <div class="mt-3 flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
              {{ userInitial }}
            </div>
            <div class="min-w-0">
              <p class="truncate font-semibold text-slate-950">{{ displayName }}</p>
              <p class="truncate text-sm text-slate-500">{{ displayRole }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 space-y-5">
          <section v-for="section in navSections" :key="section.title">
            <p class="px-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{{ section.title }}</p>
            <nav class="mt-3 grid gap-2">
              <router-link
                v-for="item in section.items"
                :key="item.to"
                :to="item.to"
                class="workspace-nav-link rounded-2xl px-4 py-3 text-sm font-semibold"
                :class="{ 'is-active': isNavActive(item) }"
              >
                <span>{{ item.label }}</span>
                <span aria-hidden="true">&rarr;</span>
              </router-link>
            </nav>
          </section>
        </div>

        <div class="mt-6 grid gap-3">
          <router-link
            v-for="link in roleConfig.quickLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {{ link.label }}
          </router-link>
        </div>
      </aside>

      <section class="min-w-0 space-y-6">
        <header class="workspace-topbar section-shell overflow-hidden px-5 py-5 sm:px-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{{ roleConfig.eyebrow }}</p>
              <h1 class="mt-2 text-3xl font-bold text-slate-950">{{ pageTitle }}</h1>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{{ pageDescription }}</p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <span class="workspace-pill">{{ displayRole }}</span>
              <router-link to="/courses" class="rounded-full border border-slate-300/80 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white">
                Explore Catalog
              </router-link>
            </div>
          </div>
        </header>

        <main class="min-w-0">
          <RouterView />
        </main>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getDashboardRoleConfig, getDashboardRouteDescription } from '@/lib/dashboardNavigation'

const store = useStore()
const route = useRoute()
const role = computed(() => store.getters['auth/userRole'])
const isAdminPanel = computed(() => route.name === 'AdminPanel')
const isInstructorPanel = computed(() => route.name === 'InstructorPanel')
const roleConfig = computed(() => getDashboardRoleConfig(role.value))
const navSections = computed(() => roleConfig.value.sections)
const pageTitle = computed(() => route.meta?.title || roleConfig.value.label)
const pageDescription = computed(() => getDashboardRouteDescription(route.name))
const displayName = computed(() => store.getters['auth/userDisplayName'] || 'Workspace User')
const userInitial = computed(() => displayName.value.trim().charAt(0).toUpperCase() || 'U')
const displayRole = computed(() => {
  if (role.value === 'ADMIN') return 'Admin'
  if (role.value === 'INSTRUCTOR') return 'Instructor'
  return 'Student'
})

const isNavActive = (item) => {
  if (item.matchNames?.includes(route.name)) {
    return true
  }
  return route.path === item.to
}
</script>

<style scoped>
.workspace-shell {
  background:
    radial-gradient(circle at 12% 10%, rgba(14, 165, 233, 0.12), transparent 34%),
    radial-gradient(circle at 88% 0%, rgba(13, 148, 136, 0.1), transparent 30%),
    linear-gradient(180deg, #f7fbfd 0%, #eef4f8 44%, #edf2f7 100%);
}

.workspace-sidebar,
.workspace-topbar {
  background:
    radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.06), transparent 28%),
    radial-gradient(circle at 0% 100%, rgba(13, 148, 136, 0.06), transparent 26%),
    rgba(255, 255, 255, 0.9);
}

.workspace-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  color: #334155;
  background: rgba(255, 255, 255, 0.72);
}

.workspace-nav-link:hover {
  border-color: #dbe4ee;
  background: rgba(248, 250, 252, 0.98);
}

.workspace-nav-link.is-active {
  border-color: rgba(14, 165, 233, 0.25);
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12), rgba(14, 165, 233, 0.12));
  color: #0f172a;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

.workspace-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(13, 148, 136, 0.1);
  color: #0f766e;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}
</style>
