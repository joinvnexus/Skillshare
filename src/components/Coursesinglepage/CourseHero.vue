<template>
  <section
    class="relative flex min-h-[420px] items-center bg-cover bg-center px-4 py-16 text-white sm:px-6 md:min-h-[520px]"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <div class="absolute inset-0 bg-slate-950/65"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/30 to-transparent"></div>

    <div class="container relative z-10 mx-auto max-w-7xl">
      <div class="max-w-3xl">
        <div class="mb-4 text-sm text-white/80 md:text-base">
          <router-link to="/courses" class="transition-colors hover:text-[var(--accent)]">Courses</router-link>
          <span class="mx-1">/</span>
          <span>{{ course.title }}</span>
        </div>

        <div class="mb-4 flex flex-wrap gap-2">
          <span v-if="course.category" class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/82">
            {{ course.category }}
          </span>
          <span class="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/82">
            {{ coursePrice }}
          </span>
        </div>

        <h1 class="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {{ course.title }}
        </h1>

        <div class="mb-6 flex flex-wrap gap-4 text-sm md:gap-6 md:text-base">
          <div class="flex items-center">
            <div class="mr-1 flex text-yellow-400">
              <i
                v-for="i in 5"
                :key="i"
                class="fas fa-star"
                :class="{ 'text-slate-500': i > Math.round(course.rating || 0) }"
              ></i>
            </div>
            <span>({{ courseRating }})</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-users mr-1.5"></i>
            <span>{{ formattedStudents }} students</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-signal mr-1.5"></i>
            <span>{{ course.level || "All Levels" }}</span>
          </div>
        </div>

        <p class="mb-8 text-base leading-relaxed text-white/90 md:text-xl">
          {{ heroDescription }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            @click="$emit('enroll')"
            class="btn-brand inline-flex items-center justify-center rounded-xl px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {{ actionLabel }}
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            <i class="far fa-heart"></i>
            <span>Add to Wishlist</span>
          </button>
        </div>

        <p class="mt-4 text-sm text-white/75 md:text-base">
          {{ actionHint }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import {
  formatCoursePrice,
  formatCourseRating,
  formatStudentCount,
  resolveCourseDescription,
  resolveCourseImage
} from "@/modules/course/coursePresentation";

export default {
  name: "CourseHero",
  props: {
    course: {
      type: Object,
      required: true
    },
    actionLabel: {
      type: String,
      default: "Enroll Now"
    },
    actionHint: {
      type: String,
      default: ""
    }
  },
  computed: {
    heroImage() {
      return resolveCourseImage(this.course, "hero");
    },
    heroDescription() {
      return resolveCourseDescription(this.course, "hero");
    },
    formattedStudents() {
      return formatStudentCount(this.course.students || 0);
    },
    coursePrice() {
      return formatCoursePrice(this.course);
    },
    courseRating() {
      return formatCourseRating(this.course.rating);
    }
  }
};
</script>
