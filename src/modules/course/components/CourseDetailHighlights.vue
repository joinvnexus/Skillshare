<template>
  <section class="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_28px_60px_rgba(15,23,42,0.1)] backdrop-blur sm:p-6">
      <div class="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Course Snapshot</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            What learners will get before they enroll.
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            A quick read on pacing, skill level, trust signals, and key takeaways so the detail page feels more decisive.
          </p>

          <div v-if="highlightTags.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="tag in highlightTags"
              :key="tag"
              class="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="item in highlightItems"
            :key="item.label"
            class="rounded-[24px] border border-slate-200/80 bg-white p-5"
          >
            <div class="flex items-center gap-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <i :class="item.icon"></i>
              </span>
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{{ item.label }}</p>
                <p class="mt-1 text-lg font-semibold text-slate-950">{{ item.value }}</p>
              </div>
            </div>
            <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formatStudentCount } from "@/modules/course/coursePresentation";

export default {
  name: "CourseDetailHighlights",
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    highlightItems() {
      return [
        {
          icon: "fas fa-layer-group",
          label: "Category",
          value: this.course.category || "General",
          copy: "Grouped with similar topics so discovery and recommendations stay relevant."
        },
        {
          icon: "fas fa-signal",
          label: "Level",
          value: this.course.level || "All Levels",
          copy: "Difficulty signal that helps learners choose the right entry point."
        },
        {
          icon: "fas fa-users",
          label: "Learners",
          value: formatStudentCount(this.course.students || 0),
          copy: "Existing student traction provides a clearer trust signal for new enrollments."
        },
        {
          icon: "fas fa-book-open",
          label: "Scope",
          value: `${this.course.lessons || 0} lessons · ${this.course.duration || "Self paced"}`,
          copy: "A quick view of how much guided material is included in the course flow."
        }
      ];
    },
    highlightTags() {
      const tags = (this.course.tags || [])
        .map((tag) => (typeof tag === "string" ? tag : tag?.name || tag?.label || ""))
        .filter(Boolean);

      return [this.course.language, this.course.certificate ? "Certificate" : null, ...tags]
        .filter(Boolean)
        .slice(0, 6);
    }
  }
};
</script>
