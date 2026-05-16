<template>
  <section class="catalog-summary overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/88 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-6">
    <div class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{{ label }}</p>
        <h2 class="mt-2 text-3xl font-bold text-slate-950">{{ title }}</h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {{ description }}
        </p>

        <div v-if="categoryHighlights.length" class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="category in categoryHighlights"
            :key="category.name"
            class="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {{ category.name }} · {{ category.count }}
          </span>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-[24px] border border-slate-200/80 bg-white/94 p-5"
        >
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{{ stat.label }}</p>
          <p class="mt-3 text-3xl font-extrabold text-slate-950">{{ stat.value }}</p>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ stat.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CatalogSummaryBar",
  props: {
    courses: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "Catalog Snapshot"
    },
    title: {
      type: String,
      default: "The marketplace should explain itself quickly."
    },
    description: {
      type: String,
      default: "Counts, categories, and free-entry options are grouped here so visitors understand the catalog before scanning individual cards."
    }
  },
  computed: {
    stats() {
      const courseCount = this.courses.length;
      const freeCourses = this.courses.filter((course) => Number(course.price || 0) === 0).length;
      const featuredCourses = this.courses.filter((course) => course.isFeatured).length;
      const popularCourses = this.courses.filter((course) => course.isPopular).length;

      return [
        {
          label: "Courses Live",
          value: courseCount,
          copy: "Active public course pages available to browse right now."
        },
        {
          label: "Free Starts",
          value: freeCourses,
          copy: "Low-friction entry points learners can join immediately."
        },
        {
          label: "Featured Picks",
          value: featuredCourses,
          copy: "Promoted launches with stronger merchandising priority."
        },
        {
          label: "Popular Demand",
          value: popularCourses,
          copy: "Courses already pulling meaningful student interest."
        }
      ];
    },
    categoryHighlights() {
      const categoryMap = this.courses.reduce((accumulator, course) => {
        const name = course.category;

        if (!name) {
          return accumulator;
        }

        accumulator[name] = (accumulator[name] || 0) + 1;
        return accumulator;
      }, {});

      return Object.entries(categoryMap)
        .map(([name, count]) => ({ name, count }))
        .sort((left, right) => right.count - left.count)
        .slice(0, 5);
    }
  }
};
</script>

<style scoped>
.catalog-summary {
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 34%),
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--brand) 10%, transparent), transparent 32%),
    rgba(255, 255, 255, 0.88);
}
</style>
