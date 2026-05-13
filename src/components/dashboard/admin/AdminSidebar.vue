<template>
  <aside class="admin-surface w-full p-4 xl:sticky xl:top-7 xl:w-72 xl:self-start">
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Admin</p>
      <p class="text-lg font-semibold text-slate-900">Control Center</p>
    </div>
    <nav class="admin-nav grid-cols-2 text-sm md:grid-cols-3 xl:grid-cols-1">
      <RouterLink :to="withTab('overview')" :class="linkClass(isActive('overview'))">Overview</RouterLink>
      <RouterLink :to="withTab('users')" :class="linkClass(isActive('users'))">Users</RouterLink>
      <RouterLink :to="withTab('testimonials')" :class="linkClass(isActive('testimonials'))">Testimonials</RouterLink>
      <RouterLink :to="withTab('orders')" :class="linkClass(isActive('orders'))">Orders</RouterLink>
      <RouterLink :to="withTab('courses')" :class="linkClass(isActive('courses'))">Courses</RouterLink>
      <RouterLink :to="withTab('paths')" :class="linkClass(isActive('paths'))">Learning Paths</RouterLink>
      <RouterLink :to="withTab('blogs')" :class="linkClass(isActive('blogs'))">Content</RouterLink>
      <RouterLink :to="withTab('reports')" :class="linkClass(isActive('reports'))">Reports</RouterLink>
      <RouterLink :to="withTab('settings')" :class="linkClass(isActive('settings'))">Settings</RouterLink>
    </nav>
    <div class="mt-5 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">
      System status is healthy. Review queue, messaging, and catalog controls are available from this workspace.
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const basePath = computed(() => "/dashboard/admin-panel");
const activeTab = computed(() => String(route.query.tab || "overview"));

const withTab = (tab) => ({ path: basePath.value, query: { tab } });

const isActive = (tab) => activeTab.value === tab;

const linkClass = (active) => ["admin-nav-link", active ? "is-active" : ""].join(" ").trim();
</script>
