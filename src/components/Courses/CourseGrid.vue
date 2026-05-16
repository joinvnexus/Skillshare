<!-- src/components/Courses /CourseGrid.vue -->
<template>
  <div id="course-listing" class="min-h-[400px]">
    <div v-if="loading" class="flex flex-col items-center justify-center px-4 py-16">
      <div class="h-12 w-12 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--brand)]"></div>
      <p class="mt-4 text-[var(--muted)]">Loading courses...</p>
    </div>

    <div v-else-if="!courses || courses.length === 0" class="py-16 px-4 text-center">
      <div class="mx-auto mb-6 h-16 w-16 text-[var(--muted)]/70">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="mb-2 text-xl font-semibold text-[var(--text)]">No courses found</h3>
      <p class="text-[var(--muted)]">Try adjusting your filters or check back later.</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
      <CourseCard
        v-for="(course, index) in courses"
        :key="course.id"
        variant="grid"
        :show-bookmark="showBookmark"
        :show-add-to-cart="true"
        :clickable-card="true"
        aos="fade-up"
        :aos-delay="(index % 4) * 100"
        @bookmark-toggle="toggleBookmark"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import CourseCard from '@/modules/course/components/CourseCard.vue'

export default {
  name: 'CourseListing',
  components: {
    CourseCard
  },
  props: {
    courses: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    showBookmark: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleBookmark(courseId) {
      this.$emit('bookmark-toggle', courseId);
    },
    
    addToCart(course) {
      this.$emit('add-to-cart', course);
    }
  }
}
</script>
