<template>
  <div class="section-shell mb-6 flex flex-col gap-4 rounded-[28px] p-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-sm font-semibold text-slate-900">
        Showing {{ visibleCount }} of {{ totalCount }} courses
      </p>
      <p class="mt-1 text-sm text-slate-500">
        {{ hasFilters ? "Results reflect your active filters and query state." : "Browse the full public marketplace and refine when needed." }}
      </p>
    </div>

    <label class="flex items-center gap-2">
      <span class="text-sm font-semibold text-slate-600">Sort by</span>
      <select
        :value="sortBy"
        @change="$emit('sort-change', $event.target.value)"
        class="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
      >
        <option value="newest">Newest</option>
        <option value="popular">Most Popular</option>
        <option value="rated">Highest Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "CatalogToolbar",
  props: {
    visibleCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    },
    hasFilters: {
      type: Boolean,
      default: false
    },
    sortBy: {
      type: String,
      default: "newest"
    }
  },
  emits: ["sort-change"]
};
</script>
