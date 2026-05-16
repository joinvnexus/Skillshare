<template>
  <div class="course-instructor space-y-8 md:space-y-12">
    <h2 class="text-2xl font-bold text-[var(--text)] md:text-3xl">About the Instructor</h2>

    <div class="instructor-profile flex flex-col gap-6 md:flex-row md:gap-8">
      <div class="avatar h-32 w-32 flex-shrink-0 md:h-40 md:w-40">
        <img :src="instructorImage" :alt="instructor" class="h-full w-full rounded-full border-4 border-white object-cover shadow-lg" />
      </div>

      <div class="details flex-1 space-y-4">
        <div>
          <h3 class="text-xl font-bold text-[var(--text)] md:text-2xl">{{ instructor }}</h3>
          <div class="rating mt-1 flex items-center gap-2">
            <div class="flex text-yellow-400">
              <i
                v-for="i in 5"
                :key="i"
                class="fas fa-star"
                :class="{ 'text-[var(--line)]': i > Math.round(instructorRating || 0) }"
              ></i>
            </div>
            <span class="text-[var(--muted)]">{{ instructorRatingText }} Instructor Rating</span>
          </div>
        </div>

        <div class="stats flex flex-wrap gap-4 md:gap-6">
          <div class="stat">
            <strong class="block text-xl font-bold text-[var(--brand-strong)]">{{ students || "12,540" }}</strong>
            <span class="text-sm text-[var(--muted)]">Students</span>
          </div>
          <div class="stat">
            <strong class="block text-xl font-bold text-[var(--brand-strong)]">{{ coursesCount || "8" }}</strong>
            <span class="text-sm text-[var(--muted)]">Courses</span>
          </div>
          <div class="stat">
            <strong class="block text-xl font-bold text-[var(--brand-strong)]">{{ reviews || "3,256" }}</strong>
            <span class="text-sm text-[var(--muted)]">Reviews</span>
          </div>
        </div>

        <p class="bio leading-relaxed text-[var(--muted)]">
          {{ bio || `${instructor} has not provided a bio.` }}
        </p>
      </div>
    </div>

    <div v-if="otherCourses.length" class="other-courses">
      <h3 class="mb-6 border-b border-[var(--line)] pb-3 text-xl font-bold text-[var(--text)] md:text-2xl">
        Other Courses by {{ instructor }}
      </h3>

      <div class="courses-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CourseCard v-for="course in otherCourses" :key="course.id" :course="course" variant="compact" />
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "@/modules/course/components/CourseCard.vue";
import { formatCourseRating } from "@/modules/course/coursePresentation";

export default {
  name: "CourseInstructor",
  components: {
    CourseCard
  },
  props: {
    instructor: { type: String, required: true },
    otherCourses: { type: Array, default: () => [] },
    students: { type: [Number, String], default: "" },
    coursesCount: { type: [Number, String], default: "" },
    reviews: { type: [Number, String], default: "" },
    bio: { type: String, default: "" },
    instructorImageUrl: { type: String, default: "" },
    instructorRating: { type: Number, default: 0 }
  },
  computed: {
    instructorImage() {
      if (this.instructorImageUrl) {
        return this.instructorImageUrl;
      }
      const name = this.instructor.toLowerCase().replace(/\s+/g, "-");
      return `/images/instructors/${name}.jpg`;
    },
    instructorRatingText() {
      return formatCourseRating(this.instructorRating || 0);
    }
  }
};
</script>
