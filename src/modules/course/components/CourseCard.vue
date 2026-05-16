<template>
  <article
    :class="cardClasses"
    :data-aos="aos"
    :data-aos-delay="aosDelay"
    :aria-label="`Course: ${course.title}`"
    :tabindex="clickableCard ? 0 : undefined"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
  >
    <div class="relative overflow-hidden bg-[var(--surface-soft)]" :class="mediaClasses">
      <img
        :src="courseImage"
        :alt="course.title"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError"
      />

      <div v-if="variant === 'grid'" class="absolute left-3 right-3 top-3 flex flex-wrap gap-2 pointer-events-none">
        <span
          v-if="course.isPopular"
          class="inline-flex items-center gap-1 rounded-full bg-yellow-500/95 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          Popular
        </span>

        <span
          v-if="course.isFeatured"
          class="inline-flex items-center gap-1 rounded-full bg-[var(--brand)]/95 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          Featured
        </span>

        <span
          v-if="Number(course.price || 0) === 0"
          class="rounded-full bg-[var(--brand-strong)]/95 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          Free
        </span>

        <span
          v-if="course.discount"
          class="rounded-full bg-red-500/95 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          -{{ course.discount }}%
        </span>

        <span
          v-if="isNewCourse"
          class="rounded-full bg-[var(--accent)]/95 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          New
        </span>
      </div>

      <div v-if="course.category" class="absolute bottom-3 left-3">
        <span class="rounded-lg bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {{ course.category }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col" :class="bodyClasses">
      <h3 :class="titleClasses">
        <router-link
          :to="courseLink"
          class="hover:no-underline focus:outline-none"
          :aria-label="`View ${course.title} course details`"
        >
          {{ course.title }}
        </router-link>
      </h3>

      <p class="mb-3 text-sm text-[var(--muted)]">
        By <span class="font-medium">{{ course.instructor || "Unknown Instructor" }}</span>
      </p>

      <p class="mb-4 flex-1 line-clamp-2 text-sm text-[var(--muted)]">
        {{ courseDescription }}
      </p>

      <div class="mb-4 flex items-center gap-2">
        <div class="flex items-center">
          <div class="flex" :aria-label="`Rating: ${courseRating} out of 5 stars`">
            <span v-for="star in 5" :key="star">
              <svg
                class="h-4 w-4"
                :class="star <= Math.round(course.rating || 0) ? 'text-yellow-400' : 'text-[var(--line)]'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
          <span class="ml-2 text-sm font-semibold text-[var(--text)]">{{ courseRating }}</span>
        </div>

        <span v-if="course.reviewCount" class="text-sm text-[var(--muted)]">
          ({{ formatNumber(course.reviewCount) }})
        </span>

        <span
          v-if="variant === 'grid' && course.level"
          class="ml-auto rounded-full px-2 py-1 text-xs"
          :class="levelClass"
        >
          {{ course.level }}
        </span>
      </div>

      <div v-if="variant === 'grid'" class="mb-4 flex items-center justify-between text-sm text-[var(--muted)]">
        <div class="flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ course.duration || "N/A" }}</span>
        </div>

        <div class="flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{{ formatNumber(course.students || 0) }}</span>
        </div>

        <div v-if="course.lessons" class="flex items-center gap-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>{{ course.lessons }} lessons</span>
        </div>
      </div>

      <div class="mt-auto border-t border-[var(--line)] pt-4">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-baseline gap-2">
            <span
              v-if="course.originalPrice && Number(course.originalPrice) > Number(course.price)"
              class="text-sm text-[var(--muted)] line-through"
            >
              ${{ course.originalPrice }}
            </span>
            <span class="text-xl font-bold" :class="Number(course.price || 0) === 0 ? 'text-[var(--brand-strong)]' : 'text-[var(--text)]'">
              {{ coursePrice }}
            </span>
            <span
              v-if="variant === 'grid' && Number(course.price || 0) > 0 && Number(course.price || 0) < 20"
              class="text-xs font-medium text-[var(--brand-strong)]"
            >
              Great value!
            </span>
          </div>

          <button
            v-if="variant === 'grid' && showBookmark"
            class="rounded-full p-2 transition-colors hover:bg-[var(--bg-alt)]"
            :aria-label="course.bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'"
            @click.stop="$emit('bookmark-toggle', course.id)"
          >
            <svg
              class="h-5 w-5"
              :class="course.bookmarked ? 'fill-red-500 text-red-500' : 'text-[var(--muted)]/70'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <router-link
          :to="courseLink"
          class="btn-brand flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-center font-semibold text-white transition-all duration-200"
          :aria-label="Number(course.price || 0) === 0 ? `Enroll in ${course.title} for free` : `View ${course.title} course details`"
        >
          <span>{{ Number(course.price || 0) === 0 ? "Enroll for Free" : "View Course" }}</span>
          <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>

        <div v-if="variant === 'grid' && Number(course.price || 0) > 0 && showAddToCart" class="mt-3 text-center">
          <button
            class="text-sm font-semibold text-[var(--brand-strong)] transition-colors hover:text-[var(--brand)]"
            @click.stop="$emit('add-to-cart', course)"
          >
            + Add to cart
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import {
  formatCompactNumber,
  formatCoursePrice,
  formatCourseRating,
  getCourseIdentifier,
  getCourseLevelClass,
  isCourseNew,
  resolveCourseDescription,
  resolveCourseImage
} from "@/modules/course/coursePresentation";

export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: "grid"
    },
    showBookmark: {
      type: Boolean,
      default: false
    },
    showAddToCart: {
      type: Boolean,
      default: true
    },
    clickableCard: {
      type: Boolean,
      default: false
    },
    aos: {
      type: String,
      default: ""
    },
    aosDelay: {
      type: [String, Number],
      default: 0
    }
  },
  emits: ["bookmark-toggle", "add-to-cart"],
  computed: {
    courseLink() {
      return `/courses/${getCourseIdentifier(this.course)}`;
    },
    courseImage() {
      return resolveCourseImage(this.course);
    },
    courseDescription() {
      return resolveCourseDescription(this.course);
    },
    coursePrice() {
      return formatCoursePrice(this.course);
    },
    courseRating() {
      return formatCourseRating(this.course.rating);
    },
    isNewCourse() {
      return isCourseNew(this.course.createdAt);
    },
    levelClass() {
      return getCourseLevelClass(this.course.level);
    },
    cardClasses() {
      const base = "group section-shell interactive-lift flex h-full flex-col overflow-hidden border border-transparent";

      if (this.variant === "compact") {
        return `${base} rounded-2xl bg-[var(--surface)]`;
      }

      return `${base} cursor-pointer rounded-2xl hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`;
    },
    mediaClasses() {
      return this.variant === "compact" ? "pt-[52%]" : "pt-[56.25%]";
    },
    bodyClasses() {
      return this.variant === "compact" ? "p-4" : "p-5 lg:p-5";
    },
    titleClasses() {
      return this.variant === "compact"
        ? "mb-2 line-clamp-2 text-lg font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--brand-strong)]"
        : "mb-2 line-clamp-2 text-lg font-bold text-[var(--text)] transition-colors group-hover:text-[var(--brand-strong)]";
    }
  },
  methods: {
    handleCardClick() {
      if (!this.clickableCard) {
        return;
      }

      this.$router.push(this.courseLink);
    },
    handleImageError(event) {
      event.target.src = resolveCourseImage(null);
    },
    formatNumber(value) {
      return formatCompactNumber(value);
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
