<template>
  <section v-if="relatedCourses.length" class="px-4 py-12 sm:px-6 md:py-16">
    <div class="mx-auto max-w-7xl rounded-[32px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Keep Exploring</p>
          <h2 class="mt-2 text-3xl font-bold text-[var(--text)] md:text-4xl">Related courses worth checking next.</h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-[var(--muted)]">
          Discovery stays in motion with a follow-up rail that reuses the same public course metadata and card language.
        </p>
      </div>

      <div v-if="loading" class="py-8 text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[var(--brand)]"></div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <RelatedCourseCard v-for="course in relatedCourses" :key="course.id" :course="course" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import RelatedCourseCard from "@/components/Courses/RelatedCourseCard.vue";

export default {
  name: "RelatedCourses",
  components: { RelatedCourseCard },
  props: {
    currentCourseId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapState("courseDetail", ["relatedCourses", "loading"])
  }
};
</script>
